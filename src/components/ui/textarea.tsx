'use client';

import { forwardRef, type TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={id}
            className="block text-sm font-medium text-beige-500 mb-1.5"
          >
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={`
            w-full px-4 py-3 rounded-xl border resize-none
            bg-white/80 backdrop-blur-sm
            text-foreground placeholder:text-beige-300
            transition-all duration-200
            focus:outline-none focus:ring-2 focus:ring-beige-400/30 focus:border-beige-400
            ${error ? 'border-red-400 focus:ring-red-400/30 focus:border-red-400' : 'border-beige-200'}
            ${className ?? ''}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
