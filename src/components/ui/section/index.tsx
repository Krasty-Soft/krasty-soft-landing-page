import React, { ReactNode } from "react";

type variant = 'white' | 'paper' | 'black'

interface Section {
  variant: variant,
  subtitle: string,
  title: string,
  children: ReactNode,
  sectionCls?: string,
  containerCls?: string,
}

const getSectionStyles = (variant: variant) => {
  switch (variant) {
    case "black":
      return 'bg-black text-white'
    case "paper":
      return 'bg-background'
    case "white":
      return 'bg-white text-black'
    default:
      return 'bg-white text-black'
  }
}

export const Section = ({ title, subtitle, children, variant, containerCls = '', sectionCls = '' } : Section) => {
  return (
    <section className={`${getSectionStyles(variant)} ${sectionCls}`}>
      <div
        className={`container px-4 py-c-50 md:px-8 md:py-c-60 lg:px-c-50 lg:py-20 xl:px-c-200 xl:py-c-100 ${containerCls}`}
      >
        <p
          className={`section-label ${variant === 'black' ? 'text-white' : 'text-dark-grey'}`}
        >
          {subtitle}
        </p>
        <h2
          className="section-header mb-6 md:mb-8 lg:mb-9 xl:mb-c-60 lg:max-w-2xl xl:max-w-3xl"
        >
          {title}
        </h2>
        {children}
      </div>
    </section>
  )
}
