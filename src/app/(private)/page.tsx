import { WeatherList } from '@/components/organism'
import { getWeather } from '@/utils/getWeather'
import { addDays, addHours, format, startOfDay } from 'date-fns'
import ButtonRedirect from './redirect'
import Weather from './weather'

const parts = ['Morning', 'Afternoon', 'Evening', 'Overnight']
async function HomePage() {
  const currentDate = new Date()
  const startDay = startOfDay(currentDate)
  const nextDay = addDays(startDay, 1)
  const coordinates = '52.520551,13.461804'
  const location = `Bogota, Colombia`
  const locationStr = `${location} ${format(currentDate, 'hh:mm aaa OOOO')}`

  const dataCurrent = await getWeather({
    start_date: currentDate.toISOString(),
    location: coordinates,
    parameters: ['t_mean_2m_12h:F', 'precip_12h:mm'],
  })

  const dataDay = (
    await getWeather({
      start_date: startDay.toISOString(),
      end_date: nextDay.toISOString(),
      interval: 'PT13H',
      location: coordinates,
      parameters: ['t_mean_2m_12h:F'],
    })
  ).map((item) => ({
    ...item,
    temperature: item['t_mean_2m_12h:F'],
  }))

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
    <div className="flex gap-4 flex-col">
      <Weather
        location={locationStr}
        precipitation={dataCurrent[0]['precip_12h:mm']}
        temperature={dataCurrent[0]['t_mean_2m_12h:F']}
        description="Partly Cloudy"
        notice="Watch: Tornado Throws Tree Limbs Through Wall"
        items={dataDay}
      />
      <WeatherList
        items={dataPartDays}
        title={`Today's Forecast for ${location}`}
      >
        <ButtonRedirect path="/by-hours" className="m-4">
          Next 48 hours
        </ButtonRedirect>
      </WeatherList>
      <WeatherList items={dataByHours} title="Hourly Forecast">
        <ButtonRedirect path="/by-hours" className="m-4">
          Next 48 hours
        </ButtonRedirect>
      </WeatherList>
      <WeatherList items={dataByDays} title="Daily Forecast">
        <ButtonRedirect path="/by-days" className="m-4">
          Next 10 days
        </ButtonRedirect>
      </WeatherList>
    </div>
  )
}

export default HomePage
