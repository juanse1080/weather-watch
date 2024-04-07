import { Cell, genericItem } from './Table'

export interface TableLoadingProps<T extends genericItem> {
  cells: Cell<T>[]
}

const TableLoading = <T extends genericItem>({
  cells,
}: TableLoadingProps<T>) => {
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
          {Array(10)
            .fill('')
            .map((_, idx) => (
              <tr
                key={`tr-${idx}`}
                className="bg-white dark:bg-gray-800 dark:border-gray-700"
              >
                {cells.map(({ field }) => (
                  <td
                    key={`td-${idx}-${field as string}`}
                    scope="row"
                    className="py-4 px-6 "
                  >
                    <div className="h-4 w-15 bg-slate-200 rounded"></div>
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default TableLoading
