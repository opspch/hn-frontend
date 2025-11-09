import { useQuery } from '@tanstack/react-query'
import { Link, useSearch } from '@tanstack/react-router'
import { storiesQueryOptions } from '../queries';

export interface Story {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
  type: string;
  url: string;
  domain: string;
}

function NewsFeed() {
  const search = useSearch({ strict: false }) as { page?: number }
  const page = search.page ?? 1
  
  const query = useQuery(storiesQueryOptions(page));

  return (
    <div className='flex flex-col gap-1 my-2'>
      {query.isFetching ?
        "Loading..." :
        query.isError ?
          query.error.message :
          query.data?.map((item, index) =>
            <div key={item.id} className='flex flex-col text-base'>
              <div className='flex gap-2'>
                <span className='w-5 text-right text-gray'>{((page - 1) * 30 + index + 1) + '.'}</span>
                <span className='w-fit whitespace-pre-wrap'><a className='visited:text-gray' href={item.url}>{item.title}</a> <span className='text-sm text-gray'>{`(${item.domain})`}</span></span>
              </div>
              <div className='ml-7 text-xs text-gray'>
                {item.points + ' points'} by <span>{item.user}</span> <Link to='/item' search={{ id: item.id }} className='hover:underline'>{item.time_ago}</Link> | <Link to='/item' search={{ id: item.id }} className='hover:underline'>{item.comments_count + " comments"}</Link>
              </div>
            </div>)
      }
      <div className='ml-7 mt-5 mb-3 text-base'>
        <Link className='visited:text-gray' to="." search={{ page: page + 1 }}>
          More
        </Link>
      </div>
    </div>
  )
}

export default NewsFeed
