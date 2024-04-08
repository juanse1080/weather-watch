import { WeatherSection } from '@/components/organism'
import { getWeather } from '@/services/weather'
import { addDays, format, startOfDay } from 'date-fns'

async function Current() {
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

  return (
    <WeatherSection
      location={locationStr}
      precipitation={dataCurrent[0]['precip_12h:mm']}
      temperature={dataCurrent[0]['t_mean_2m_12h:F']}
      description="Partly Cloudy"
      notice="Watch: Tornado Throws Tree Limbs Through Wall"
      items={dataDay}
    />
  )
}

export default Current
