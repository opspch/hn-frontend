import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import hnLogo from '../../y18.svg';

const RootLayout = () => (
  <div className='m-2 bg-beige border-b-2 border-orange'>
    <div className="flex gap-2 text-base bg-orange p-0.5">
      <Link to="/"><img className='border-1 border-white' src={hnLogo} alt='Hacker News logo'></img></Link>
      <Link to="/news" className="font-bold">
        Hacker News
      </Link>
      <Link to="/about">
        about
      </Link>
    </div>
    <Outlet />
    <TanStackRouterDevtools initialIsOpen={false} position="bottom-right" />
  </div>
)

export const Route = createRootRoute({ component: RootLayout })