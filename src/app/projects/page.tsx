import { permanentRedirect } from 'next/navigation'

export default function LegacyProjectsRedirect() {
  permanentRedirect('/work')
}
