import { ComponentProps } from "react";

interface IconButtonProps extends ComponentProps<'button'> {
  transparent?: boolean
}

export function IconButton({ disabled, transparent, ...props }: IconButtonProps) {
  return (
    <button
      {...props}
      disabled={disabled}
      className={
        `
        ${transparent ? 'bg-black/20 border border-white/20 rounded-md p-1.5' : 'bg-white/20 border border-white/20 rounded-md p-1.5'}
        ${disabled ? 'bg-white/5' : ''} 
        `
      }
    >
      {props.children}
    </button>
  )
}