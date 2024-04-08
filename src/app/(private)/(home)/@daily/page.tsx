import { WeatherList } from '@/components/organism'
import { getWeather } from '@/services/weather'
import { addDays, format } from 'date-fns'
import ButtonRedirect from '../redirect'

async function Daily() {
  const currentDate = new Date()
  const coordinates = '52.520551,13.461804'

  const dataByDays = (
    await getWeather({
      start_date: currentDate.toISOString(),
      end_date: addDays(currentDate, 5).toISOString(),
      interval: 'PT24H',
      location: coordinates,
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
    <WeatherList items={dataByDays} title="Daily Forecast">
      <ButtonRedirect path="/by-days" className="m-4">
        Next 10 days
      </ButtonRedirect>
    </WeatherList>
  )
}

export default Daily
