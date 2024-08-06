import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { ForwardedRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { FaSpinner } from 'react-icons/fa6'

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  asChild?: boolean
  sizes?: 'xs' | 'sm' | 'lg' | 'icon' | 'full'
  variant?:
    | 'primary'
    | 'secundary'
    | 'outline'
    | 'highlight'
    | 'disabled'
    | 'link'
    | 'danger'
    | 'warning'
    | 'Shine'
    | 'Swipe'
  ref?: ForwardedRef<HTMLButtonElement>
}

export function Button({
  className,
  isLoading = false,
  sizes = 'xs',
  variant = 'primary',
  asChild = false,
  ref,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: 'bg-emerald-900 text-emerald-50 hover:bg-emerald-800',
    secundary: 'bg-emerald-50 text-emerald-900 hover:bg-emerald/50',
    outline:
      'bg-transparent border border-secundary text-light hover:bg-emerald-900 ',
    highlight: 'text-Teal-50 hover:bg-Teal-800 duration-300 bg-Teal-900',
    disabled: 'bg-opacity-80 bg-Teal-950 border border-Teal-800 text-Teal-50',
    link: 'bg-transparent border-none underline-offset-4 hover:underline',
    danger: 'bg-red-700 hover:bg-red-600 text-zinc-50',
    warning: 'bg-yellow-400 text-zinc-900 hover:bg-yellow-300',
    Shine:
      'before:ease relative  overflow-hidden border border-emerald-800 bg-Emerald-800 text-white shadow-2xl transition-all before:absolute before:right-0 before:top-0 before:h-12 before:w-6 before:translate-x-12 before:rotate-6 before:bg-white before:opacity-10 before:duration-700 hover:shadow-emerald-500 hover:before:-translate-x-40',
    Swipe:
      'text-emerald-50 hover:before:bg-redborder-emerald-500 relative  overflow-hidden border border-emerald-500 bg-white text-emerald-500 shadow-2xl transition-all before:absolute before:bottom-0 before:left-0 before:top-0 before:z-0 before:h-full before:w-0 before:bg-emerald-500 before:transition-all before:duration-500 hover:text-white hover:shadow-primary-500 hover:before:left-0 hover:before:w-full',
  }
  const sizeClasses = {
    xs: 'h-10 w-20  px-3 py-2 text-xs',
    sm: 'h-14 w-24  px-3 py-2 text-sm',
    lg: 'h-16 w-28  px-8 py-4 text-lg',
    icon: 'h-9 w-9 p-1 ',
    full: 'h-10 px-4 py-2 w-full text-lg',
  }

  const _className = twMerge(
    variantClasses[variant],
    sizeClasses[sizes],
    `appearance-none rounded-md  flex items-center justify-center  font-normal transition-all duration-500 `,
    className,
  )
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      ref={ref}
      className={_className}
      {...props}
      disabled={isLoading || variant === 'disabled'}
    >
      {isLoading ? (
        <span className="flex items-center w-full gap-1">
          {props.children}
          <FaSpinner size={20} className="animate-spin text-zinc-50" />
        </span>
      ) : (
        <Comp>{props.children}</Comp>
      )}
    </Comp>
  )
}
