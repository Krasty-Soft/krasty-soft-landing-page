import { Case, CaseTemplate } from '@/lib/cases'
import { TemplateDefault } from './default'
import { TemplateBrief } from './brief'

interface CaseTemplateRendererProps {
    caseData: Case
    template?: CaseTemplate
}

export function CaseTemplateRenderer({
    caseData,
    template = 'default',
}: CaseTemplateRendererProps) {
    if (template === 'brief' && caseData.brief) {
        return <TemplateBrief caseData={{ ...caseData, brief: caseData.brief }} />
    }
    return <TemplateDefault caseData={caseData} />
}
