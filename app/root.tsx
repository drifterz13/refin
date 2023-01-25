import { defer, MetaFunction } from '@remix-run/node'
import {
  Await,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react'
import { Suspense } from 'react'
import Navbar from './components/Navbar.react'
import SearchDialog from './components/SearchDialog.react'
import { getAllFundAmc, getFundsById } from './lib/fund'

import styles from './styles/app.css'

export function links() {
  return [{ rel: 'stylesheet', href: styles }]
}

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'Refin',
  viewport: 'width=device-width,initial-scale=1',
})

export async function loader() {
  const fundAmcList = await getAllFundAmc()
  const fundIds = fundAmcList.map((amc) => amc.unique_id)
  const funds = Promise.all(fundIds.map(getFundsById))

  return defer({ fundAmcList, funds })
}

export default function App() {
  const data = useLoaderData<typeof loader>()

  return (
    <html lang='en'>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <div className='min-h-screen flex flex-col'>
          <Navbar>
            <Suspense>
              <Await resolve={data.funds}>
                {(funds) => <SearchDialog funds={funds.flat()} />}
              </Await>
            </Suspense>
          </Navbar>
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
