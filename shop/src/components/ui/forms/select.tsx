import cn from 'classnames';
import React, { SelectHTMLAttributes } from 'react';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  className?: string;
  label?: string;
  name: string;
  error?: string;
  options: Array<{ value: string; label: string }>;
  variant?: 'normal' | 'solid' | 'outline' | 'line';
  dimension?: 'small' | 'medium' | 'big';
}

const variantClasses = {
  normal:
    'bg-gray-100 border border-border-base rounded focus:shadow focus:bg-light focus:border-accent',
  solid:
    'bg-gray-100 border border-border-100 rounded focus:bg-light focus:border-accent',
  outline: 'border border-border-base rounded focus:border-accent',
  line: 'ltr:pl-0 rtl:pr-0 border-b border-border-base rounded-none focus:border-accent',
};

const sizeClasses = {
  small: 'text-sm h-9',
  medium: 'h-12',
  big: 'h-14',
};

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      className,
      label,
      name,
      error,
      options,
      variant = 'normal',
      dimension = 'medium',
      disabled = false,
      inputClassName,
      ...rest
    },
    ref
  ) => {
    return (
      <div className={className}>
        {label && (
          <label
            htmlFor={name}
            className="mb-3 block text-sm font-semibold leading-none text-body-dark"
          >
            {label}
          </label>
        )}
        <select
          id={name}
          name={name}
          ref={ref}
          className={cn(
            'flex w-full appearance-none items-center px-4 text-sm text-heading transition duration-300 ease-in-out focus:outline-0 focus:ring-0',
            variantClasses[variant],
            sizeClasses[dimension],
            disabled && 'cursor-not-allowed bg-gray-100',
            inputClassName
          )}
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          {...rest}
        >
          {options.map((option) => (
            <option key={option.uuid} value={option.uuid}>
              {option?.identity}
            </option>
          ))}
        </select>
        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export default Select;
