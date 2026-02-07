import { getAllCases } from '@/lib/cases'
import HealthcareClient from './client'

export default async function HealthcarePage() {
  const cases = await getAllCases()
  return <HealthcareClient cases={cases} />
}
