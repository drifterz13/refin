import { useRef, useState, useEffect } from 'react'

export default function TruncateText(props: { text: string }) {
  const descRef = useRef<HTMLDivElement | null>(null)
  const [descIsTruncated, setDescIsTruncated] = useState(false)

  useEffect(() => {
    if (!descRef.current) {
      return
    }

    if (descRef.current.scrollHeight > descRef.current.clientHeight) {
      setDescIsTruncated(true)
    }
  }, [])

  return (
    <>
      <div
        ref={descRef}
        className='text-gray-700 mt-5 w-4/5 max-h-60 line-clamp-3'
        dangerouslySetInnerHTML={{
          __html: props.text,
        }}
      />

      {descIsTruncated && (
        <span
          className='font-semibold text-sm text-blue-600 cursor-pointer hover:underline'
          onClick={() => {
            descRef.current?.classList.remove('line-clamp-3')
            descRef.current?.classList.add('overflow-y-auto')
            setDescIsTruncated(false)
          }}
        >
          Read more
        </span>
      )}
    </>
  )
}
