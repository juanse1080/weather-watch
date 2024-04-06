import axios from 'axios'

export type WeatherParams<T extends string = string> = {
  start_date: string
  end_date?: string
  interval?: string
  location: string
  parameters: T[]
}

export const getWeather = async <T extends string = string>({
  start_date,
  end_date,
  interval,
  location,
  parameters,
}: WeatherParams<T>) => {
  let time = start_date
  if (end_date) time += `--${end_date}`
  if (interval) time += `:${interval}`

  const {
    data: { data: weatherData },
  } = await axios.get(`${time}/${parameters}/${location}/json`, {
    baseURL: process.env.WEATHER_BASE_URL,
    auth: {
      username: process.env.WEATHER_USER_NAME,
      password: process.env.WEATHER_PASSWORD,
    },
  })

  const response = Array(weatherData[0].coordinates[0].dates.length)
    .fill(0)
    .map((_, datesIdx) => {
      return weatherData.reduce(
        (acc: any, _curr: any, parameterIdx: number) => {
          return {
            ...acc,
            [weatherData[parameterIdx].parameter]:
              weatherData[parameterIdx].coordinates[0].dates[datesIdx].value,
          }
        },
        {
          date: weatherData[0].coordinates[0].dates[datesIdx].date,
        },
      )
    }) as Array<{ date: string } & Record<T, number>>

  return response
}
