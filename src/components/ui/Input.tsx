import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

const inputVariants = cva(
  'w-full rounded-xl border-2 bg-white px-4 py-3 text-base transition-all duration-300 placeholder:text-gray-400 focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'border-gray-200 hover:border-gray-300 focus:border-brand-600',
        error: 'border-danger-300 bg-danger-50 focus:border-danger-500',
        success: 'border-success-300 bg-success-50 focus:border-success-500'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  label?: string;
  error?: string;
  success?: string;
  helperText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, label, error, success, helperText, id, ...props }, ref) => {
    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
    const hasError = !!error;
    const hasSuccess = !!success;
    
    const finalVariant = hasError ? 'error' : hasSuccess ? 'success' : variant;

    return (
      <div className="space-y-2">
        {label && (
          <label 
            htmlFor={inputId}
            className="block text-sm font-semibold text-gray-700"
          >
            {label}
            {props.required && <span className="text-danger-500 ml-1">*</span>}
          </label>
        )}
        
        <input
          ref={ref}
          id={inputId}
          className={inputVariants({ variant: finalVariant, className })}
          aria-invalid={hasError}
          aria-describedby={
            error ? `${inputId}-error` : 
            success ? `${inputId}-success` : 
            helperText ? `${inputId}-helper` : undefined
          }
          {...props}
        />
        
        {error && (
          <p id={`${inputId}-error`} className="text-sm text-danger-600 flex items-center space-x-1">
            <span>⚠️</span>
            <span>{error}</span>
          </p>
        )}
        
        {success && (
          <p id={`${inputId}-success`} className="text-sm text-success-600 flex items-center space-x-1">
            <span>✅</span>
            <span>{success}</span>
          </p>
        )}
        
        {helperText && !error && !success && (
          <p id={`${inputId}-helper`} className="text-sm text-gray-500">
            {helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input, inputVariants };