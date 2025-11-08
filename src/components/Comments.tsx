import { useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import Comment from './Comment';
import { type CommentData } from './Comment';

interface ArticleItem {
  id: number;
  title: string;
  points: number;
  user: string;
  time: number;
  time_ago: string;
  comments_count: number;
  type: 'link';
  url: string;
  domain: string;
  comments: CommentData[];
}

export interface CommentItem {
  id: number;
  title: string;
  user: string;
  time: number;
  time_ago: string;
  type: 'comment';
  content: string;
  url: string;
  comments: CommentData[];
}

function Comments() {
  const search = useSearch({ strict: false }) as { id: number, page?: number}
  const id = search.id
  // const page = search.page ?? 1
  //
  // TODO figure out whether the comments are paginated
  // fetch(`https://api.hackerwebapp.com/item/${id}?page=${page}`)
  // 
  const fetchItem = (id: number): Promise<ArticleItem | CommentItem> => {
    return fetch(`https://api.hackerwebapp.com/item/${id}`)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
        }
        return response.json();
      })
  }
  const query = useQuery({
    queryKey: ['comments', id],
    queryFn: () => fetchItem(id),
  })

  const renderItem = (item: ArticleItem | CommentItem) => {
    switch (item.type) {
      case "link":
        return <div key={item.id} className='flex flex-col gap-6 ml-7 text-sm'>
          <div>
            <div className='flex gap-2'>
              <span className='whitespace-pre-wrap'><a href={item.url}>{item.title}</a> {`(${item.domain})`}</span>
            </div>
            <div className='text-xs'>
              {item.points + ' points'} by <span>{item.user}</span> <span>{item.time_ago}</span> | <span>{item.comments_count + " comments"}</span>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            {item.comments.map(comment => <Comment data={comment} />)}
          </div>
        </div>;
      case "comment":
        return <div key={item.id} className='flex flex-col gap-6 ml-7 text-sm'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <span className='whitespace-pre-wrap'><span>{item.user}</span> <span>{item.time_ago}</span></span>
            </div>
            <div className='text-xs' dangerouslySetInnerHTML={{__html: item.content }}></div>
          </div>
          <div className='flex flex-col gap-2'>
            {item.comments.map(comment => <Comment data={comment} />)}
          </div>
        </div>
    }
  }

  return (
    <>
      {query.isFetching ?
        "Loading..." :
        query.isError ?
          query.error :
          !query.data ?
          "" :
          renderItem(query.data)
      }
      {/* <div className='ml-7 mt-3 text-sm'>
        <Link to="." search={{ page: page + 1 }}>
          More
        </Link>
      </div> */}
    </>
  )
}

export default Comments
