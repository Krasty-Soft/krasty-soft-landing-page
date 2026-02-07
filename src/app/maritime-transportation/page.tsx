import { getAllCases } from '@/lib/cases'
import MaritimeTransportationClient from './client'

export default async function MaritimeTransportationPage() {
  const cases = await getAllCases()
  return <MaritimeTransportationClient cases={cases} />
}
