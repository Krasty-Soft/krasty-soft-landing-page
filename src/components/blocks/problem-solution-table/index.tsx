export interface ProblemSolutionItem {
  problem: string
  solution: string
}

interface ProblemSolutionTableProps {
  items: ProblemSolutionItem[]
}

const bodyTextStyle = {
  fontSize: '1.0625rem',
  lineHeight: '1.8',
  color: 'var(--text-secondary)',
  marginBottom: '1rem',
}

export function ProblemSolutionTable({ items }: ProblemSolutionTableProps) {
  return (
    <>
      {/* Desktop: table */}
      <div
        className="hidden md:grid"
        style={{
          gridTemplateColumns: '1fr 1fr',
          border: '1px solid var(--border-default)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
        }}
      >
        <div style={{ padding: '0.75rem 1.25rem', backgroundColor: 'rgba(220, 38, 38, 0.08)', borderBottom: '1px solid var(--border-default)', borderRight: '1px solid var(--border-default)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Problem</div>
        <div style={{ padding: '0.75rem 1.25rem', backgroundColor: 'rgba(220, 38, 38, 0.08)', borderBottom: '1px solid var(--border-default)', fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.875rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Solution</div>
        {items.map((item, i) => (
          <>
            <div key={`p-${i}`} style={{ padding: '1rem 1.25rem', borderBottom: i < items.length - 1 ? '1px solid var(--border-default)' : 'none', borderRight: '1px solid var(--border-default)', color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.7' }}>{item.problem}</div>
            <div key={`s-${i}`} style={{ padding: '1rem 1.25rem', borderBottom: i < items.length - 1 ? '1px solid var(--border-default)' : 'none', color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: '1.7' }}>{item.solution}</div>
          </>
        ))}
      </div>

      {/* Mobile: stacked cards */}
      <div className="flex flex-col gap-3 md:hidden">
        {items.map((item, i) => (
          <div key={i} style={{ border: '1px solid var(--border-default)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
            <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(220, 38, 38, 0.08)', borderBottom: '1px solid var(--border-default)' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--brand-red)' }}>Problem</span>
              <p style={{ ...bodyTextStyle, marginBottom: 0, marginTop: '0.25rem' }}>{item.problem}</p>
            </div>
            <div style={{ padding: '0.75rem 1rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-secondary)' }}>Solution</span>
              <p style={{ ...bodyTextStyle, marginBottom: 0, marginTop: '0.25rem' }}>{item.solution}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
