import { Pill } from "@/components/ui";

export const Filters = ({ filters, onSelect, selected = 'all' } : {filters: any[], onSelect: (selected: string) => void, selected?: string}) => {

  return (
    <ul className="flex flex-wrap gap-4">
      {
        filters.map((filter) => {
          return (
            <div key={filter.label} className={'flex items-start gap-2'}>
              <Pill
                title={filter.label}
                variant={filter.value === selected ? 'active' : 'filled'}
                onSelect={() => onSelect(filter.value)}
                hoverable
              />
              <span className="text-dark-grey text-xs">{filter.count}</span>
            </div>
          )
        })
      }
    </ul>
  )
}
