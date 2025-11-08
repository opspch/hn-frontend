import { useState } from 'react';
import { Link } from '@tanstack/react-router'

export interface CommentData {
  id: number;
  level: number;
  user: string;
  time: number;
  time_ago: string;
  content: string;
  comments: CommentData[];
}

interface CommentProps {
  data: CommentData
}

function Comment({ data } : CommentProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div key={data.id} className='flex flex-col gap-2 text-sm'>
      <div>
        <div className='flex gap-2'>
          <span className='whitespace-pre-wrap'>{data.user} <Link to='/item' search={{id: data.id}}>{data.time_ago}</Link> <button onClick={() => setCollapsed(!collapsed)}>{collapsed ? '[+]': '[-]'}</button></span>
        </div>
        <div className={collapsed ? "hidden" : "text-xs"} dangerouslySetInnerHTML={{__html: data.content }}></div>
      </div>
      <div className={collapsed ? "hidden" : "flex flex-col gap-2 ml-7"}>
        {data.comments.map(comment => <Comment data={comment} ></Comment>)}
      </div>
    </div>
  )
}

export default Comment
