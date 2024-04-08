import { WeatherList } from '@/components/organism'
import { getWeather } from '@/services/weather'
import { addDays, startOfDay } from 'date-fns'
import ButtonRedirect from '../redirect'

const parts = ['Morning', 'Afternoon', 'Evening', 'Overnight']
async function Today() {
  const currentDate = new Date()
  const startDay = startOfDay(currentDate)
  const nextDay = addDays(startDay, 1)
  const coordinates = '52.520551,13.461804'
  const location = `Bogota, Colombia`

  const dataPartDays = (
    await getWeather({
      start_date: startDay.toISOString(),
      end_date: nextDay.toISOString(),
      interval: 'PT8H',
      location: coordinates,
      parameters: ['t_mean_2m_12h:F', 'precip_12h:mm', 'prob_precip_12h:p'],
    })
  ).map((item, idx) => ({
    ...item,
    date: new Date(item.date).getTime(),
    name: parts[idx],
    temperature: item['t_mean_2m_12h:F'],
    precipitation: item['precip_12h:mm'],
    probability_precipitation: item['prob_precip_12h:p'],
  }))

  return (
    <WeatherList
      items={dataPartDays}
      title={`Today's Forecast for ${location}`}
    >
      <ButtonRedirect path="/by-hours" className="m-4">
        Next 48 hours
      </ButtonRedirect>
    </WeatherList>
  )
}

export default Today
