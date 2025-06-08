const getSize = (size: string) => {
  switch (size) {
    case 'small':
      return 'h-10'
    case 'medium':
      return 'h-c-100'
    case 'tall':
      return 'h-96'
    default: return ''
  }
}

const getVariant = (variant: string) => {
  switch (variant) {
    case 'white':
      return 'bg-white text-black'
    case 'paper':
      return 'bg-background text-black'
    case 'black':
      return 'bg-black text-white'
    default: return ''
  }
}

type Size = 'small' | 'medium' | 'tall';
type Variant = 'white' | 'paper' | 'black';

export const Placeholder = ({ size = 'small', variant = 'white', children } : { size?: Size, variant?: Variant, children: string }) => {

  return (
    <div className={`${getSize(size)} ${getVariant(variant)} font-semibold center`}>
      {children} is under development.
    </div>
  )
}
