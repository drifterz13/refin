import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import LeftNavBar from './components/LeftNavBar.react'

import styles from './styles/app.css'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
})

export default function App() {
  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className='min-h-screen flex flex-col'>
          <header className='bg-red-50'>Header</header>
          <div className='flex-1 flex flex-col sm:flex-row'>
            <main className='flex-1 bg-indigo-100'>
              <Outlet />
            </main>
            <LeftNavBar />
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
