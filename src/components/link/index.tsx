import Link from "next/link";
import React from "react";
import Arrow from "@/assets/arrow-right-up.svg";

export const ArrowLink = ({to, title = 'Learn More'} : { to: string, title?: string}) => {
  return (
    <Link
      href={to}
      className="group flex items-center gap-2 font-medium text-base underline underline-offset-4 hover:text-red"
    >
      {title}
      <Arrow className="group-hover:stroke-red" />
    </Link>
    )
}
