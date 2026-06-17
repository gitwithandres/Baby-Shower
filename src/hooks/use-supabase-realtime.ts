'use client';

import { useEffect, useState, useCallback } from 'react';
import { getSupabaseClient } from '@/lib/supabase/client';

export function useSupabaseRealtime<T extends Record<string, unknown>>(
  table: string,
  initialData: T[] = []
) {
  const [data, setData] = useState<T[]>(initialData);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    const supabase = getSupabaseClient();
    const { data: result } = await supabase
      .from(table)
      .select('*')
      .order('created_at', { ascending: false });

    if (result) {
      setData(result as T[]);
    }
    setIsLoading(false);
  }, [table]);

  useEffect(() => {
    fetchData();

    const supabase = getSupabaseClient();
    const channel = supabase
      .channel(`${table}-changes`)
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table },
        () => {
          fetchData();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [table, fetchData]);

  return { data, isLoading, refetch: fetchData };
}
