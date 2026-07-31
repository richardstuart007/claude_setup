import OwnerPage from 'nextjs-shared/OwnerPage'
import OwnerTableLogging from 'nextjs-shared/OwnerTableLogging'

export default function OwnerPageRoute() {
  return <OwnerPage tabs={[{ label: 'Logging', content: <OwnerTableLogging /> }]} />
}
