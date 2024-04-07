import { merge } from '@/utils/merge-clsx'
import Link from 'next/link'

export interface PaginationProps {
  page: number
  per_page: number
  count: number
  url: string
}

const Pagination = ({ page, per_page, count, url }: PaginationProps) => {
  const disabledBefore = page === 0
  const disabledNext = per_page * (page + 1) > count

  return (
    <div className="py-3">
      <div className="flex items-center justify-between">
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              <span className="font-medium">{count}</span> results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <Link
                prefetch
                href={`${url}?page=${page - 1}&per_page=${per_page}`}
                className={merge(
                  'relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm text-gray-500 hover:bg-gray-50',
                  {
                    'cursor-not-allowed opacity-50 pointer-events-none':
                      disabledBefore,
                  },
                )}
                aria-disabled={disabledBefore}
                tabIndex={disabledBefore ? -1 : undefined}
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
              </Link>

              <Link
                prefetch
                href={`${url}?page=${page + 1}&per_page=${per_page}`}
                className={merge(
                  'relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm  text-gray-500 hover:bg-gray-50',
                  {
                    'cursor-not-allowed opacity-50 pointer-events-none':
                      disabledNext,
                  },
                )}
                aria-disabled={disabledNext}
                tabIndex={disabledNext ? -1 : undefined}
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
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pagination
