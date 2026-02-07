'use client'

import { Section, Slider, TypingText } from '@/components/ui'
import { Case } from '@/lib/cases'
import { Slide } from './slide'

interface CasesProps {
    cases: Case[]
}

export const Cases = ({ cases }: CasesProps) => {
    return (
        <Section variant="secondary" animate={false}>
            {/* Custom Title with Typing Effect */}
            <div className="mb-12 md:mb-16">
                <h2
                    className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold"
                    style={{ 
                        color: 'var(--text-primary)',
                        lineHeight: '1.4'
                    }}
                >
                    <span style={{ color: 'var(--brand-red)' }}>&gt; </span>
                    <TypingText
                        text="Real-world insights and success stories."
                        speed={50}
                        delay={300}
                        highlightWords={['Real-world', 'success']}
                    />
                </h2>
            </div>

            <Slider>
                {cases?.map((item, i) => (
                    <Slide slide={item} key={i} />
                ))}
            </Slider>
        </Section>
    )
}
