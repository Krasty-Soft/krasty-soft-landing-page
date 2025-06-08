import React from "react";
import { formatTagLabel } from "@/lib/util";

type variants = 'bordered' | 'active' | 'filled';

const getStyles = (variant: variants) => {
  switch (variant) {
    case "active":
      return 'bg-red text-white'
    case "bordered":
      return 'border border-light-grey'
    case "filled":
      return 'bg-white'
    default: return ''
  }
}

export const Pill = ({ title, variant, onSelect } : { title: string, variant: variants, onSelect?: (opt?: unknown) => void }) => {
  return (
    <button
      className={`text-xs rounded-full px-4 py-2 ${getStyles(variant)}`}
      onClick={onSelect ?? undefined}
      disabled={Boolean(onSelect === undefined)}
    >
      {formatTagLabel(title)}
    </button>
  )
}
