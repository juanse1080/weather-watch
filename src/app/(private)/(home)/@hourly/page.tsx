import { WeatherList } from '@/components/organism'
import { getWeather } from '@/services/weather'
import { addHours, format } from 'date-fns'
import ButtonRedirect from '../redirect'

async function Hourly() {
  const currentDate = new Date()
  const coordinates = '52.520551,13.461804'

  const dataByHours = (
    await getWeather({
      start_date: currentDate.toISOString(),
      end_date: addHours(currentDate, 5).toISOString(),
      interval: 'PT1H',
      location: coordinates,
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
    <WeatherList items={dataByHours} title="Hourly Forecast">
      <ButtonRedirect path="/by-hours" className="m-4">
        Next 48 hours
      </ButtonRedirect>
    </WeatherList>
  )
}

export default Hourly
