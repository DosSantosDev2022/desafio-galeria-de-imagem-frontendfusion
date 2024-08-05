import React from 'react'
import { twMerge } from 'tailwind-merge'

const InputRoot = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge(
      'flex h-14 w-full items-center gap-3 rounded  bg-Emerald-800 p-4 focus-within:ring-2 focus-within:ring-Emerald-900',
      className,
    )}
    {...props}
  />
))

InputRoot.displayName = 'InputRoot'

const InputIcon = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => (
  <i ref={ref} className={twMerge('', className)} {...props} />
))

InputIcon.displayName = 'InputIcon'

const ComponentInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={twMerge(
        'text-md flex-1 bg-transparent font-light text-zinc-300 outline-none placeholder:text-zinc-400',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

ComponentInput.displayName = 'Input'

export { InputRoot, InputIcon, ComponentInput }
