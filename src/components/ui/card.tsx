import React from 'react'
import { twMerge } from 'tailwind-merge'

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge('rounded-lg border shadow-sm', className)}
    {...props}
  />
))

Card.displayName = 'Card'

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={twMerge('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
))

CardHeader.displayName = 'CardHeader'

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HtmlHTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={twMerge(
      'text-2xl font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
))

CardTitle.displayName = 'CardTitle'

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={twMerge('text-sm', className)} {...props} />
))

CardDescription.displayName = 'CardDescription'

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge('px-3 py-4', className)} {...props} />
))

CardContent.displayName = 'CardContent'

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={twMerge('px-2 py-3 pt-0', className)} {...props} />
))
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
