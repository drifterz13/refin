import {
  Bars3Icon,
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/20/solid'
import { Link, NavLink } from '@remix-run/react'
import { clsx } from 'clsx'
import { useState } from 'react'

export default function Navbar() {
  return (
    <nav className='bg-white border-gray-200 mx-6 py-3'>
      <div className='flex items-center justify-between w-full'>
        <Link to='/'>
          <span className='text-xl font-semibold whitespace-nowrap'>Refin</span>
        </Link>

        <div className='flex items-center gap-5'>
          <button className='p-2 w-48 flex text-sm items-baseline text-gray-500 bg-gray-50 border border-gray-300 rounded-lg'>
            <MagnifyingGlassIcon className='w-3.5 h-3.5 mr-3' />
            <span>Search</span>
            <span className='ml-auto'>
              <kbd>⌘</kbd>
              <kbd>K</kbd>
            </span>
          </button>

          <div>
            <ul className='flex space-x-8 text-sm'>
              <li>
                <NavLink
                  to='/amc'
                  className={({ isActive }) =>
                    clsx(
                      'block py-2 pl-3 pr-4 text-gray-700 hover:bg-transparent hover:text-blue-700',
                      isActive && 'text-blue-700'
                    )
                  }
                >
                  Fund AMC
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}
