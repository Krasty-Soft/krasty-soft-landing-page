'use client'

import React from 'react'

type variant = 'primary' | 'secondary' | 'accent'

type BtnProps = {
    title: string
    onClick: () => void
    disabled?: boolean
    variant?: variant
    fullSize?: boolean
    classes?: string
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const getVariant = (variant: variant) => {
    switch (variant) {
        case 'primary':
            return 'bg-black text-white hover:text-red hover:border-red'
        case 'secondary':
            return 'bg-white text-black hover:text-red hover:border-red'
        case 'accent':
            return 'bg-red text-white hover:bg-white hover:text-red hover:border-red'
    }
}

export const Button = ({
    title,
    onClick,
    disabled = false,
    variant = 'accent',
    fullSize = false,
    classes = '',
    ...props
}: BtnProps) => {
    return (
        <button
            className={`rounded-[40px] border-1 border-transparent cursor-pointer whitespace-nowrap ${getVariant(
                variant,
            )} ${fullSize ? 'w-full' : ''} ${classes}`}
            onClick={onClick}
            disabled={disabled}
            {...props}
        >
            {title}
        </button>
    )
}
