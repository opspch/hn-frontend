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

// count all children and the root comment recursively
function countComments(item: CommentData): number {
  let result = 1;
  for (const comment of item.comments) {
    result += countComments(comment)
  }  
  return result;
}

function Comment({ data } : CommentProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div key={data.id} className='flex flex-col gap-2'>
      <div className='flex gap-2'>
        <span className='whitespace-pre-wrap text-xs text-gray'>{data.user} <Link to='/item' search={{id: data.id}}>{data.time_ago}</Link> <a onClick={() => setCollapsed(!collapsed)}>{collapsed ? `[${countComments(data)} more]`: '[-]'}</a></span>
      </div>
      <div className={collapsed ? "hidden" : "text-sm"} dangerouslySetInnerHTML={{__html: data.content }}></div>
      <div className={collapsed ? "hidden" : "flex flex-col gap-2 ml-7"}>
        {data.comments.map(comment => <Comment data={comment} />)}
      </div>
    </div>
  )
}

export default Comment
