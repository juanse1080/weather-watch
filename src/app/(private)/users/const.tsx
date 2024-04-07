'use client'

import { Cell, genericItem } from '@/components/molecules'
import { UserModel } from '@/interfaces'
import { merge } from '@/utils/merge-clsx'

export type getCellsType<T extends genericItem> = (
  loading?: number,
  onDelete?: (item: T) => (e: unknown) => void,
) => Cell<T>[]

export const getCells: getCellsType<UserModel> = (loading, onDelete) => [
  {
    label: 'Name',
    field: 'name',
  },
  {
    label: 'Role',
    field: 'roles',
  },
  {
    label: 'Email',
    field: 'email',
  },
  {
    label: 'Actions',
    renderCell: (item) => (
      <button
        className={merge('text-red-500', {
          'cursor-not-allowed opacity-50': item.roles.includes('admin'),
        })}
        onClick={() => {
          if (onDelete) onDelete(item)
        }}
        disabled={item.roles.includes('admin')}
      >
        {loading === item.id ? (
          <svg
            className="animate-spin -ml-1 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              fill="transparent"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="16"
            viewBox="0 -960 960 960"
            width="16"
            fill="currentColor"
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
        )}
      </button>
    ),
  },
]
