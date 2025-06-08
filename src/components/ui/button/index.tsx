'use client';

import React from "react";

type variant = 'primary' | 'secondary' | 'accent';

type BtnProps =  {
  title: string;
  onClick: () => void;
  disabled?: boolean;
  variant?: variant;
  fullSize?: boolean;
  classes?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const getVariant = (variant: variant) => {
  switch (variant) {
    case 'primary':
      return 'bg-black text-white';
    case 'secondary':
      return 'bg-white text-black';
    case 'accent':
      return 'bg-red text-white';
  }
}

export const Button = ({ title, onClick, disabled = false, variant = 'accent', fullSize = false, classes = '', ...props } : BtnProps) => {
  return (
    <button
      className={`rounded-[40px] cursor-pointer ${getVariant(variant)} ${fullSize ? 'w-full' : ''} ${classes}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {title}
    </button>
  )
}
