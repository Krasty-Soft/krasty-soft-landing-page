import { Case, CaseTemplate } from '@/lib/cases'
import { TemplateDefault } from './default'

interface CaseTemplateRendererProps {
    caseData: Case
    template?: CaseTemplate
}

export function CaseTemplateRenderer({
    caseData,
    //template = 'default',
}: CaseTemplateRendererProps) {
    return <TemplateDefault caseData={caseData} />
}
