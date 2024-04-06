import { WeatherList } from '@/components/organism'
import { getWeather } from '@/utils/getWeather'
import { addDays, format } from 'date-fns'

const ByDaysPage = async ({ searchParams }: any) => {
  // TODO: change type
  const numberOfDays = Number(searchParams?.days) || 10
  const currentDate = new Date()
  const location = '52.520551,13.461804'
  const title = `Daily Forecast for ${numberOfDays} days`

  const dataByDays = (
    await getWeather({
      start_date: currentDate.toISOString(),
      end_date: addDays(currentDate, numberOfDays).toISOString(),
      interval: 'PT24H',
      location,
      parameters: ['t_mean_2m_12h:F', 'precip_12h:mm', 'prob_precip_12h:p'],
    })
  ).map((item) => ({
    ...item,
    date: new Date(item.date).getTime(),
    name: format(new Date(item.date), 'E d'),
    temperature: item['t_mean_2m_12h:F'],
    precipitation: item['precip_12h:mm'],
    probability_precipitation: item['prob_precip_12h:p'],
  }))

  return (
    <div className="bg-white flex gap-4 flex-col">
      <WeatherList items={dataByDays} title={title} />
    </div>
  )
}

export default ByDaysPage
