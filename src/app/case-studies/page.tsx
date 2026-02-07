import { FolderOpen } from 'lucide-react'
import { getAllCases } from '@/lib/cases'
import CaseStudiesClient from './client'

export default async function CaseStudiesPage() {
    const cases = await getAllCases()

    return <CaseStudiesClient cases={cases} />
}
