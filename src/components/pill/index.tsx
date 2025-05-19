import React from "react";

export const Pill = ({title} : { title: string}) => {
  return (
    <div className="text-xs px-4 py-2 rounded-full border border-light-grey">{title}</div>
  )
}
