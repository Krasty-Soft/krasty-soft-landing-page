import React from "react";
import Right from '@/assets/arrow-right.svg'
import Left from '@/assets/arrow-left.svg'

export const Dot = ({ selected, onClick } : {selected: boolean, onClick: () => void}) => (
  <button
    className={`h-1 flex-grow ${selected ? "bg-black" : "bg-light-grey"}`}
    type="button"
    onClick={onClick}
  />
);

export const Prev = ({ enabled, onClick } : {enabled: boolean, onClick: () => void}) => (
  <button
    className={`p-3 center border rounded-lg ${enabled ? 'border-dark-grey' : 'border-light-grey'}`}
    onClick={onClick}
    disabled={!enabled}
  >
    <Left className={`${enabled ? '' : 'opacity-20'}`} />
  </button>
);

export const Next = ({ enabled, onClick }: {enabled: boolean, onClick: () => void}) => (
  <button
    className={`p-3 center border rounded-lg ${enabled ? 'border-dark-grey' : 'border-light-grey'}`}
    onClick={onClick}
    disabled={!enabled}
  >
    <Right className={`${enabled ? '' : 'opacity-20'}`} />
  </button>
);
