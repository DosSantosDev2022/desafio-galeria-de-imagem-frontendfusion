import React, { createContext, ReactNode, useContext, useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface DropDownContextProps {
  isOpen: boolean
  toggleOpen: () => void
}

const DropDownContext = createContext<DropDownContextProps | undefined>(
  undefined,
)

const useDropDownContext = () => {
  const context = useContext(DropDownContext)
  if (!context) {
    throw new Error(
      'DropDown components must be used within a DropDown provider',
    )
  }
  return context
}

const DropDownProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false)
  const toggleOpen = () => setIsOpen((prev) => !prev)

  return (
    <DropDownContext.Provider value={{ isOpen, toggleOpen }}>
      {children}
    </DropDownContext.Provider>
  )
}

const DropDownContainer = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div {...props} className={twMerge('relative', className)} ref={ref} />
))

DropDownContainer.displayName = 'DropDownContainer'

const DropDownTrigger = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { toggleOpen } = useDropDownContext()
  return (
    <button
      onClick={toggleOpen}
      {...props}
      className={twMerge(
        'text-emerald-900 w-full font-normal hover:bg-emerald-600 px-2 py-2.5 rounded-md duration-500 hover:text-zinc-50',
        className,
      )}
      ref={ref}
    />
  )
})

DropDownTrigger.displayName = 'DropDownTrigger'

const DropDownContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen } = useDropDownContext()
  return (
    isOpen && (
      <div
        {...props}
        className={twMerge(
          'absolute mt-1  rounded-md bg-zinc-50 p-2  shadow-lg   transition-opacity ',
          className,
        )}
        ref={ref}
      />
    )
  )
})

DropDownContent.displayName = 'DropDownContent'

const DropDownList = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul
    {...props}
    className={twMerge('flex flex-col gap-1', className)}
    ref={ref}
  />
))

DropDownList.displayName = 'DropDownList'

const DropDownItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li
    {...props}
    className={twMerge(
      'cursor-pointer border-b px-2 py-1.5 hover:text-zinc-50 hover:bg-emerald-600 w-full',
      className,
    )}
    ref={ref}
  />
))

DropDownItem.displayName = 'DropDownItem'

const DropDownLabel = React.forwardRef<
  HTMLLabelElement,
  React.HTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => {
  return (
    <label
      className={twMerge(
        ' ml-1.5 border-b-zinc-600 px-2 py-1.5 text-sm font-semibold text-zinc-800',
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})

DropDownLabel.displayName = 'DropDownLabel'

const DropDownLink = React.forwardRef<
  HTMLAnchorElement,
  React.HTMLAttributes<HTMLAnchorElement>
>(({ className, ...props }, ref) => {
  return (
    <a
      className={twMerge(
        'flex w-full items-center justify-start gap-2  text-sm font-semibold ',
        className,
      )}
      {...props}
      ref={ref}
    />
  )
})

DropDownLink.displayName = 'DropDownLink'

const DropDownAction = React.forwardRef<
  HTMLButtonElement,
  React.HTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  return <button className={twMerge('', className)} {...props} ref={ref} />
})

DropDownAction.displayName = 'DropDownAction'

const DropDownIcon = React.forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, ...props }, ref) => {
  return (
    <i
      className={twMerge(
        'flex h-6 w-6 items-center justify-center text-zinc-600',
        className,
      )}
      {...props}
      ref={ref}
    />
  )
})

DropDownIcon.displayName = 'DropDownIcon'

export {
  DropDownContainer,
  DropDownContent,
  DropDownItem,
  DropDownList,
  DropDownLabel,
  DropDownLink,
  DropDownIcon,
  DropDownTrigger,
  DropDownAction,
  DropDownProvider,
}
