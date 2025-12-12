import { Case, CaseTemplate } from '@/lib/cases'
import { TemplateDefault } from './default'
import { TemplateSrm } from './srm'

interface CaseTemplateRendererProps {
    caseData: Case
    template?: CaseTemplate
}

export function CaseTemplateRenderer({
    caseData,
    template = 'default',
}: CaseTemplateRendererProps) {
    switch (template) {
        case 'srm':
            return <TemplateSrm caseData={caseData} />
        case 'default':
        default:
            return <TemplateDefault caseData={caseData} />
    }
}
