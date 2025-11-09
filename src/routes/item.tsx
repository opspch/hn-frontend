import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import Comments from '../components/Comments'
import { itemQueryOptions } from '../queries'
import { useTitle } from '../hooks/useTitle'

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
    const item = await context.queryClient.fetchQuery(itemQueryOptions(location.search.id));
    return { item };
  },
  component: Item,
})

function Item() {
  const { item } = useLoaderData({ from: Route.id });
  useTitle(item.title ? item.title : item.content);

  return (
    <Comments />
  )
}