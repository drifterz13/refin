import _ from 'lodash'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { createfundSearcher, Fund } from '~/lib/fund'

type Props = {
  funds: Fund[]
}

export default function SearchDialog(props: Props) {
  const fundSearcherRef = useRef<ReturnType<typeof createfundSearcher>>()
  const [open, setOpen] = useState(false)
  const [searchedFunds, setSearchedFunds] = useState<Fund[]>([])

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

  const search = _.debounce((query: string) => {
    const funds = fundSearcherRef.current!.search(query)
    setSearchedFunds(funds)
  }, 350)

  useEffect(() => {
    fundSearcherRef.current = createfundSearcher(props.funds, [
      'proj_abbr_name',
      'proj_name_en',
      'proj_name_th',
    ])
  }, [props.funds])

  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'k' && e.metaKey) {
        e.preventDefault()
        openModal()
      }
    }
    window.addEventListener('keydown', handler)

    return () => window.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <button
        type='button'
        onClick={openModal}
        className='p-2 w-48 flex text-sm items-center text-gray-600 bg-gray-50 border border-gray-300 rounded-lg'
      >
        <MagnifyingGlassIcon className='w-3.5 h-3.5 mr-3 text-gray-500' />
        <span>Search</span>
        <span className='ml-auto'>
          <kbd>⌘</kbd>
          <kbd>K</kbd>
        </span>
      </button>

      <Transition appear show={open} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-md bg-white text-left align-middle shadow-xl transition-all'>
                  <div className='flex gap-2 items-center border-b-[1px] border-gray-200'>
                    <MagnifyingGlassIcon className='w-5 h-5 text-gray-500 mx-4' />
                    <input
                      placeholder='Search fund'
                      type='text'
                      className='h-12 flex-1 focus-visible:outline-none p-2'
                      onChange={(e) => search(e.target.value)}
                    />
                  </div>

                  <div className='flex flex-col p-4 gap-2 min-h-[100px] max-h-72 overflow-y-auto'>
                    {searchedFunds.length > 0 ? (
                      <Fragment>
                        <div className='font-semibold text-sm text-gray-600'>
                          Result
                        </div>
                        {searchedFunds.map((fund) => (
                          <div
                            key={`${fund.unique_id}_${fund.proj_abbr_name}`}
                            className='px-6 py-3 rounded-xl bg-slate-100 shadow-sm font-medium hover:bg-blue-600 hover:text-white'
                          >
                            <div className='uppercase font-semibold'>
                              {fund.proj_abbr_name}
                            </div>
                            <div className='text-xs opacity-60 truncate'>
                              {fund.proj_name_en}
                            </div>
                          </div>
                        ))}
                      </Fragment>
                    ) : (
                      <div className='text-gray-400 font-light flex-1 grid place-content-center'>
                        No search results
                      </div>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
