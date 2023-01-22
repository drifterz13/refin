import type { MetaFunction } from '@remix-run/node'
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react'
import Navbar from './components/Navbar.react'

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
          <Navbar />
          <div className='flex-1 flex flex-col sm:flex-row'>
            <main className='flex-1 bg-slate-100 p-10'>
              <Outlet />
            </main>
          </div>
        </div>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
