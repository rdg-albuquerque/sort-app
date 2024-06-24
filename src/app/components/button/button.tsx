import { ComponentProps } from "react"

const Button = ({
  children,
  className,
  disabled,
  ...props
}: ComponentProps<"button">) => {
  return (
    <button
      className={
        className ??
        `${
          disabled ? "bg-gray-500" : "bg-[#4646bb]"
        } text-white px-[40px] py-[18px] rounded-[38px]`
      }
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
