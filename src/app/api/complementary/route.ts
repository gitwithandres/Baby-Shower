import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/server';

export async function DELETE(request: Request) {
  try {
    const supabase = getSupabaseAdmin();
    const { searchParams } = new URL(request.url);
    const guest = searchParams.get('guest');

    if (!guest) {
      return NextResponse.json({ error: 'Invitado requerido' }, { status: 400 });
    }

    const { error } = await supabase
      .from('complementary_selections')
      .delete()
      .eq('nombre_invitado', guest);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    return NextResponse.json(
      { error: 'Supabase no configurado' },
      { status: 500 }
    );
  }
}
