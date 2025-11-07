import { createFileRoute } from '@tanstack/react-router'
import NewsFeed from '../components/NewsFeed'

export const Route = createFileRoute('/news')({
  component: Index,
})

function Index() {
  return (
    <div className="p-2">
      <h3>Welcome to News!</h3>
      <NewsFeed />
    </div>
  )
}