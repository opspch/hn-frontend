import { createFileRoute } from '@tanstack/react-router'
import NewsFeed from '../components/NewsFeed'

type NewsSearchParams = {
  page?: number
}

export const Route = createFileRoute('/news')({
  validateSearch: (search: Record<string, unknown>): NewsSearchParams => {
    // validate and parse the search params into a typed state
    return {
      page: Number(search?.page ?? 1),
    }
  },
  component: News,
})

function News() {
  return (
    <div className="p-2">
      <h3>Welcome to News!</h3>
      <NewsFeed />
    </div>
  )
}