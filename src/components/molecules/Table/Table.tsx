import { ReactNode } from 'react'

export type genericItem = Record<string, any>

export interface Cell<T extends genericItem> {
  label: string
  field?: keyof T
  renderCell?: (item: T) => ReactNode
}

export interface TableProps<T extends genericItem> {
  items: T[]
  cells: Cell<T>[]
}

const Table = <T extends genericItem>({ items, cells }: TableProps<T>) => {
  return (
    <div className="overflow-x-auto relative border rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {cells.map(({ field, label }) => (
              <th
                key={`th-${field as string}`}
                scope="col"
                className="py-3 px-6"
              >
                {label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {items.map((item) => (
            <tr
              key={`tr-${item.id}`}
              className="bg-white dark:bg-gray-800 dark:border-gray-700"
            >
              {cells.map(({ field, renderCell }) => (
                <td
                  key={`td-${item.id}-${field as string}`}
                  scope="row"
                  className="py-4 px-6 "
                >
                  {renderCell
                    ? renderCell(item)
                    : field && field in item && item[field]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Table
