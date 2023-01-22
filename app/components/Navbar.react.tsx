import { Bars3Icon } from '@heroicons/react/20/solid'
import { Link, NavLink } from '@remix-run/react'
import { clsx } from 'clsx'
import { useState } from 'react'

export default function Navbar() {
  const [expand, setExpand] = useState(false)

  return (
    <nav className='bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <Link to='/' className='flex items-center'>
          <span className='self-center text-xl font-semibold whitespace-nowrap'>
            Refin
          </span>
        </Link>
        <button
          data-collapse-toggle='navbar-default'
          type='button'
          className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
          aria-controls='navbar-default'
          aria-expanded={expand}
          onClick={() => setExpand((prevState) => !prevState)}
        >
          <span className='sr-only'>Open main menu</span>
          <Bars3Icon className='w6 h-6' aria-hidden={!expand} />
        </button>
        <div
          className={clsx(
            'w-full md:w-auto',
            expand ? 'block' : 'hidden md:block'
          )}
          id='navbar-default'
        >
          <ul className='flex flex-col p-4 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white'>
            <li>
              <NavLink
                to='/amc'
                className={({ isActive }) =>
                  clsx(
                    'block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0',
                    isActive &&
                      'text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700'
                  )
                }
              >
                Fund AMC
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
