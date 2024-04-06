import { WeatherIcon } from '@/components/molecules'
import { merge } from '@/utils/merge-clsx'
import { closestTo } from 'date-fns'
import { PropsWithChildren } from 'react'

export interface PartsOfDayProps {
  title: string
  items: {
    name: string
    date: number
    temperature: number
    precipitation: number
    probability_precipitation: number
  }[]
}

function PartsOfDay({
  title,
  items,
  children,
}: Readonly<PropsWithChildren<PartsOfDayProps>>) {
  const currentDate = new Date()

  const currentPart = closestTo(
    currentDate,
    items.map(({ date }) => date),
  ) as Date

  return (
    <div className="bg-white border border-[#e5eaf2] text-black rounded-lg overflow-hidden">
      <div className="p-4 text-xl font-bold">{title}</div>
      <div className="flex flex-col divide-y divide-slate-200">
        {items.map(
          ({
            date,
            name,
            temperature,
            precipitation,
            probability_precipitation,
          }) => {
            return (
              <div
                key={name}
                className={merge('flex items-center p-4', {
                  'font-bold': date === currentPart.getTime(),
                })}
              >
                <h3 className="text-xl basis-1/2">{name}</h3>
                <span className="text-2xl text-blue-700 basis-1/4">
                  {temperature}°
                </span>
                <span className="basis-1/4">
                  <WeatherIcon
                    precipitation={precipitation}
                    height={50}
                    width={50}
                  />
                </span>
                <span className="basis-1/4 text-xl">
                  {probability_precipitation}%
                </span>
              </div>
            )
          },
        )}
      </div>
      {children}
    </div>
  )
}

export default PartsOfDay
