import { useQuery } from '@tanstack/react-query'
import { Link, useSearch } from '@tanstack/react-router'

interface Story {
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
  
  const fetchStories = (page: number): Promise<Story[]> => fetch('https://api.hackerwebapp.com/news?page=' + page).then(response => response.json())
  const query = useQuery({
    queryKey: ['stories', page],
    queryFn: () => fetchStories(page),
  })  
  console.log(query);


  return (
    <>
      <div className='text-xl'>Hello world</div>
      {query.isFetching ?
        "Loading..." :
        query.isError ?
          query.error :
          query.data?.map((item, index) =>
            <div key={item.id} className='flex flex-col text-sm'>
              <div className='flex gap-2'>
                <span className='w-5 text-right'>{((page - 1) * 30 + index + 1) + '.'}</span>
                <span>{item.title}</span>
                <span>{`(${item.domain})`}</span>
              </div>
              <div className='ml-7 text-xs'>
                {item.points + ' points'} by <span>{item.user}</span> <span>{item.time_ago}</span> | <span>{item.comments_count + " comments"}</span>
              </div>
            </div>)
      }
      <div className='ml-7 mt-3 text-sm'>
        <Link to="." search={{ page: page + 1 }}>
          More
        </Link>
      </div>
    </>
  )
}

export default NewsFeed
