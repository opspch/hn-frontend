import { createFileRoute } from '@tanstack/react-router'
import NewsFeed from '../components/NewsFeed'
import { storiesQueryOptions } from '../queries'

type NewsSearchParams = {
  page?: number
}

export const Route = createFileRoute('/')({
  validateSearch: (search: Record<string, unknown>): NewsSearchParams => {
    // validate and parse the search params into a typed state
    return {
      page: Number(search?.page ?? 1),
    }
  },
  loader: async ({ context, location }) => {
    // @ts-expect-error Not sure why we are getting type errors here, it has something to do with the router module declaration
    await context.queryClient.ensureQueryData(storiesQueryOptions(location.search.page ?? 1))

  },
  component: Index,
})

function Index() {
  return (
    <NewsFeed />
  )
}