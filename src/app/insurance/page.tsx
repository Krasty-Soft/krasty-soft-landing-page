import { getAllCases } from '@/lib/cases'
import InsuranceClient from './client'

export default async function InsurancePage() {
  const cases = await getAllCases()
  return <InsuranceClient cases={cases} />
}
