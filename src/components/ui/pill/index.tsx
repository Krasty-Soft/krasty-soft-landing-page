import { formatTagLabel } from '@/lib/util'

type variants = 'bordered' | 'active' | 'filled'

const getStyles = (hoverable: boolean, variant: variants) => {
    if (hoverable) {
        switch (variant) {
            case 'active':
                return 'cursor-pointer bg-red text-white hover:bg-white hover:text-red'
            case 'bordered':
                return 'cursor-pointer border border-light-grey'
            case 'filled':
                return 'cursor-pointer bg-white hover:bg-red hover:text-white'
            default:
                return ''
        }
    } else {
        switch (variant) {
            case 'active':
                return 'bg-red text-white'
            case 'bordered':
                return 'border border-light-grey'
            case 'filled':
                return 'bg-white'
            default:
                return ''
        }
    }
}

export const Pill = ({
    title,
    variant,
    onSelect,
    hoverable = false,
}: {
    title: string
    variant: variants
    onSelect?: (opt?: unknown) => void
    hoverable?: boolean
}) => {
    return (
        <button
            className={`text-xs rounded-full px-4 py-2 ${getStyles(
                hoverable,
                variant
            )}`}
            onClick={onSelect ?? undefined}
            disabled={Boolean(onSelect === undefined)}
        >
            {formatTagLabel(title)}
        </button>
    )
}
