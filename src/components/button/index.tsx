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

const paddings = 'py-3 px-8 md:py-5 md:px-10';
const fontSizes = 'text-sm md:text-base xl:text-lg';

export const Button = ({title, onClick, disabled = false, variant = 'accent', fullSize = false, classes = '', ...props} : BtnProps) => {
  return (
    <button
      className={`rounded-[40px] ${fontSizes} cursor-pointer ${paddings} ${getVariant(variant)} ${fullSize ? 'w-full' : ''} ${classes}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {title}
    </button>
  )
}
