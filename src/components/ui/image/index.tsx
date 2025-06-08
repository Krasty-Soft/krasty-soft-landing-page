import NextImage from "next/image";
import type { ComponentProps } from "react";

type objectFit = 'object-cover' | 'object-contain' | 'object-fill' | 'object-none' | 'object-scale-down';

interface CustomProps {
  src: string,
  alt?: string,
  wrapperClasses?: string,
  imgClasses?: string,
  fillMode?: objectFit,
}

type ImageProps = CustomProps & Omit<ComponentProps<typeof NextImage>, 'fill' | 'className'>;

export const Image = (
  {
    src,
    alt = '',
    wrapperClasses = '',
    imgClasses = '',
    fillMode = 'object-cover',
    ...props
  } : ImageProps) => {
  return (
    <div className={`relative ${wrapperClasses}`}>
      <NextImage
        src={src}
        fill
        alt={alt}
        className={`${imgClasses} ${fillMode}`}
        {...props}
      />
    </div>
  )
}
