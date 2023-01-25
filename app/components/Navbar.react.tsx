import { Link, NavLink } from '@remix-run/react'
import { clsx } from 'clsx'
import SearchDialog from './SearchDialog.react'

export default function Navbar(props: { children?: React.ReactNode }) {
  return (
    <nav className='bg-white border-gray-200 mx-6 py-3'>
      <div className='flex items-center justify-between w-full'>
        <Link to='/'>
          <span className='text-xl font-semibold whitespace-nowrap'>Refin</span>
        </Link>

        <div className='flex items-center gap-5'>
          {props.children}

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
