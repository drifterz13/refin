import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'

type Props = {
  label?: React.ReactNode
  placeholder: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  disabled?: boolean
}

export default function SearchBox(props: Props) {
  return (
    <div className='flex items-center'>
      <label htmlFor='search-box' className='sr-only'>
        {props.label}
      </label>
      <div className='relative w-full'>
        <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
          <MagnifyingGlassIcon className='w-5 h-5 text-gray-500' />
        </div>
        <input
          type='text'
          id='search-box'
          className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5'
          placeholder={props.placeholder}
          disabled={props.disabled}
          onChange={props.onChange}
        />
      </div>
    </div>
  )
}
