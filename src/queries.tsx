import { queryOptions } from '@tanstack/react-query';
import { type ArticleItem, type CommentItem  } from './components/Comments';
import { type Story } from './components/NewsFeed'

const fetchItem = (id: number): Promise<ArticleItem | CommentItem> => {
    return fetch(`https://api.hackerwebapp.com/item/${id}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
}

export const itemQueryOptions = (id: number) => {
    return queryOptions({
        queryKey: ['comments', id],
        queryFn: () => fetchItem(id),
    })
}

const fetchStories = (page: number): Promise<Story[]> => {
    return fetch('https://api.hackerwebapp.com/news?page=' + page)
    .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
    })
}
export const storiesQueryOptions = (page: number) => {
    return queryOptions({
        queryKey: ['stories', page],
        queryFn: () => fetchStories(page),
    })
}