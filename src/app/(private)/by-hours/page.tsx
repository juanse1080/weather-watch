import { WeatherList } from '@/components/organism'
import { getWeather } from '@/services/weather'
import { addHours, format } from 'date-fns'

const ByDaysPage = async ({ searchParams }: any) => {
  // TODO: change type
  const numberOfDays = Number(searchParams?.hours) || 6
  const currentDate = new Date()
  const location = '52.520551,13.461804'
  const title = `Hourly Forecast for ${numberOfDays} hours`

  const dataByHours = (
    await getWeather({
      start_date: currentDate.toISOString(),
      end_date: addHours(currentDate, numberOfDays).toISOString(),
      interval: 'PT1H',
      location,
      parameters: ['t_mean_2m_12h:F', 'precip_12h:mm', 'prob_precip_12h:p'],
    })
  ).map((item) => ({
    ...item,
    date: new Date(item.date).getTime(),
    name: format(new Date(item.date), 'h aaa'),
    temperature: item['t_mean_2m_12h:F'],
    precipitation: item['precip_12h:mm'],
    probability_precipitation: item['prob_precip_12h:p'],
  }))

  return (
    <div className="bg-white flex gap-4 flex-col">
      <WeatherList items={dataByHours} title={title} />
    </div>
  )
}

export default ByDaysPage
