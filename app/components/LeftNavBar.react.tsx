import { Link } from '@remix-run/react'

export default function LeftNavBar() {
  return (
    <nav className='order-first sm:w-32 bg-purple-200'>
      <ul>
        <li className='block'>
          <Link to='/funds'>Create Port</Link>
        </li>
      </ul>
    </nav>
  )
}
