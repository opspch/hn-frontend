import { useQuery } from '@tanstack/react-query'
import { useSearch } from '@tanstack/react-router'
import Comment from './Comment';
import { type CommentData } from './Comment';
import { itemQueryOptions } from '../queries';

export interface ArticleItem {
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
  const query = useQuery(itemQueryOptions(id))

  const renderItem = (item: ArticleItem | CommentItem) => {
    switch (item.type) {
      case "link":
        return <div className='flex flex-col gap-6 ml-7'>
          <div>
            <div className='flex gap-2'>
              <span className='whitespace-pre-wrap text-base'><a className='visited:text-gray' href={item.url}>{item.title}</a> <span className='text-gray'>{`(${item.domain})`}</span></span>
            </div>
            <div className='text-xs text-gray'>
              {item.points + ' points'} by <span>{item.user}</span> <span>{item.time_ago}</span> | <span>{item.comments_count + " comments"}</span>
            </div>
          </div>
          <div className='flex flex-col gap-2'>
            {item.comments.map(comment => <Comment data={comment} />)}
          </div>
        </div>;
      case "comment":
        return <div className='flex flex-col gap-6 ml-7'>
          <div className='flex flex-col gap-2'>
            <div className='flex gap-2'>
              <span className='whitespace-pre-wrap text-xs text-gray'><span>{item.user}</span> <span>{item.time_ago}</span></span>
            </div>
            <div className='text-sm' dangerouslySetInnerHTML={{__html: item.content }}></div>
          </div>
          <div className='flex flex-col gap-2'>
            {item.comments.map(comment => <Comment data={comment} />)}
          </div>
        </div>
    }
  }

  return (
    <div className='pt-3 pb-6'>
      {query.isFetching ?
        "Loading..." :
        query.isError ?
          query.error.message :
          !query.data ?
          "" :
          renderItem(query.data)
      }
      {/* <div className='ml-7 mt-3 text-sm'>
        <Link to="." search={{ page: page + 1 }}>
          More
        </Link>
      </div> */}
    </div>
  )
}

export default Comments
