import { stripHtmlTags } from '../utils'
import { useEffect } from 'react'

export function useTitle(title: string) {
  useEffect(() => {
    if (title) {
      if (title.length > 80) {
        document.title = `${stripHtmlTags(title).slice(0,80)}... | Hacker News`;
      }
      else {
        document.title = `${stripHtmlTags(title)} | Hacker News`;
      }
    }
    return () => {
      document.title = 'Hacker News';
    };
  }, [title]);
}

