import { createFileRoute } from '@tanstack/react-router'
import Comments from '../components/Comments'
import { itemQueryOptions } from '../queries'

type ItemSearchParams = {
  id: number,
  page?: number,
}

export const Route = createFileRoute('/item')({
  validateSearch: (search: Record<string, unknown>): ItemSearchParams => {
    // validate and parse the search params into a typed state
    return {
      id: Number(search.id),
      page: Number(search?.page ?? 1),
    }
  },
  loader: async ({ context, location }) => {
    // @ts-expect-error Not sure why we are getting type errors here, it has something to do with the router module declaration
    await context.queryClient.ensureQueryData(itemQueryOptions(location.search.id))

  },
  component: Item,
})

function Item() {
  return (
    <Comments />
  )
}