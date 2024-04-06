import { merge } from '@/utils/merge-clsx'
import { ButtonHTMLAttributes, forwardRef } from 'react'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  fullWidth?: boolean
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      fullWidth,
      loading,
      children,
      disabled: disabledProp,
      ...props
    },
    ref,
  ) => {
    const disabled = disabledProp || loading

    return (
      <button
        ref={ref}
        className={merge(
          'flex justify-center items-center w-min bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg whitespace-nowrap',
          {
            'cursor-not-allowed opacity-50 hover:bg-blue-500': disabled,
            'w-full': fullWidth,
          },
          className,
        )}
        disabled={disabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-3 h-5 w-5 "
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}

        {children}
      </button>
    )
  },
)
Button.displayName = 'Button'

export default Button
