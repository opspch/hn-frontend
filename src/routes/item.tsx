import { createFileRoute } from '@tanstack/react-router'
import Comments from '../components/Comments'

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
  component: Item,
})

function Item() {
  return (
    <div className="p-2">
      <h3>Welcome to Comments!</h3>
      <Comments />
    </div>
  )
}