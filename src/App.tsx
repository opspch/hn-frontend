import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  const [page, setPage] = useState(1)
  interface Story {
    id: number;
    title: string;
    points: number;
    user: string;
    time: number;
    time_ago: string;
    comments_count: number;
    type: string;
    url: URL;
    domain: URL
  }
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
          query.data?.map(item => <div>{item.title}</div>)}
    </>
  )
}

export default App
