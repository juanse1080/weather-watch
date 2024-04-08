import { Button } from '@/components/atoms'
import { WeatherIcon } from '@/components/molecules'

export interface WeatherSectionProps {
  location: string
  temperature: number
  precipitation: number
  description: string
  notice: string
  items: {
    date: string
    temperature: number
  }[]
}

function WeatherSection({
  location,
  temperature,
  precipitation,
  description,
  notice,
  items,
}: Readonly<WeatherSectionProps>) {
  return (
    <div className="bg-blue-500 text-white rounded-lg overflow-hidden">
      <div className="bg-translucid p-4 text-xl font-bold">{location}</div>
      <div className="flex justify-between items-center px-6 py-4">
        <div className="flex flex-col">
          <h3 className="text-8xl">{temperature}°</h3>
          <span className="text-2xl">{description}</span>
          <span className="text-2xl">
            Day {items[0].temperature}° | Night {items[1].temperature}°
          </span>
        </div>
        <WeatherIcon precipitation={precipitation} width={100} height={100} />
      </div>
      <div className="p-4">
        <Button
          fullWidth
          disabled
          className="bg-translucid justify-center hover:bg-blue-900"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="currentColor"
            className="mr-2"
          >
            <path d="m380-300 280-180-280-180v360ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
          </svg>
          {notice}
        </Button>
      </div>
    </div>
  )
}

export default WeatherSection
