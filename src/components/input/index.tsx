import React from "react";

type InputProps = {
  className?: string,
  placeholder: string,
  error?: string,
} & React.InputHTMLAttributes<HTMLInputElement>

export const Input = ({placeholder, error, className, ...props} : InputProps) => {
  return (
    <div className="relative">
      <input
        className={`px-5 py-4 w-full bg-dark-green text-white placeholder-dark-grey rounded-2xl outline-0 border ${error ? 'border-red' : 'border-dark-green'} ${className ? className : ''}`}
        placeholder={placeholder}
        {...props}
      />
      {
        error && <p className="absolute top-0 left-0 text-xs text-red">{error}</p>
      }
    </div>
  )
}
