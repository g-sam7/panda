import { useState } from 'react'
import {
  PaperClipIcon,
} from '@heroicons/react/20/solid'

const Textarea = ({ user }) => {
  const [selected, setSelected] = useState()
  const { email } = user;
  console.log('data', user.username);
  return (
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">
        <div className="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center">
          <span className="text-white text-lg font-semibold">
            {email?.substring(0, 2).toUpperCase()}
          </span>
        </div>
      </div>
      <div className="min-w-0 flex-1">
        <form action="#" className="relative">
          <div className="overflow-hidden rounded-lg shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 bg-white">
            <textarea
              rows={2}
              name="comment"
              id="comment"
              className="block w-full resize-none border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="Say something..."
              defaultValue={''}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Post
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Textarea;
