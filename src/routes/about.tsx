import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
  component: About,
})

function About() {
  return <div className="p-2 text-base">
    This is built with React, Tailwind CSS, @tanstack/react-router and @tanstack/react-query. I started from the vite react-ts template.
    The Hacker News API I used is here: <a className='hover:underline visited:text-gray' href='https://github.com/cheeaun/node-hnapi'>https://github.com/cheeaun/node-hnapi</a>.
    The source code is here: <a className='hover:underline visited:text-gray' href='https://github.com/opspch/hn-frontend'>https://github.com/opspch/hn-frontend/</a>
  </div>
}