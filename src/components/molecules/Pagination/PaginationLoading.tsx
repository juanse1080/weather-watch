import { merge } from '@/utils/merge-clsx'

const PaginationLoading = () => {
  return (
    <div className="py-3">
      <div className="flex items-center justify-between">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700 flex gap-2">
              <span className="h-5 w-5 inline-block bg-slate-200 rounded"></span>
              results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <div
                className={merge(
                  'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-50 cursor-not-allowed opacity-50 pointer-events-none',
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  viewBox="0 -960 960 960"
                  width="16"
                  fill="currentColor"
                >
                  <path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z" />
                </svg>
              </div>

              <div
                className={merge(
                  'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm  text-gray-500 hover:bg-gray-50 cursor-not-allowed opacity-50 pointer-events-none',
                )}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="16"
                  viewBox="0 -960 960 960"
                  width="16"
                  fill="currentColor"
                >
                  <path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" />
                </svg>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaginationLoading
