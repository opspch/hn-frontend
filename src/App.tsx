import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import './App.css'

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

function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  
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
                <span className={index < 9 ? "ml-2" : ""}>{(index + 1) + '.'}</span>
                <span>{item.title}</span>
                <span>{`(${item.domain})`}</span>
              </div>
              <div className='ml-7 text-xs'>
                {item.points + ' points'} by <span>{item.user}</span> <span>{item.time_ago}</span> | <span>{item.comments_count + " comments"}</span>
              </div>
            </div>)}
    </>
  )
}

export default App
