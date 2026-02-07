import { getAllCases } from '@/lib/cases'
import FintechClient from './client'

export default async function FintechPage() {
  const cases = await getAllCases()
  return <FintechClient cases={cases} />
}
