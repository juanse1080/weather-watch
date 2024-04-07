import { merge } from '@/utils/merge-clsx'

function WeatherListLoading() {
  return (
    <div className="bg-white border border-[#e5eaf2] text-black rounded-lg overflow-hidden">
      <div className="p-4 text-xl font-bold">
        <div className="h-7 w-2/3 bg-slate-200 rounded"></div>
      </div>
      <div className="flex flex-col divide-y divide-slate-200 animate-pulse">
        {Array(5)
          .fill('')
          .map((_, idx) => {
            return (
              <div key={idx} className={merge('flex items-center p-4')}>
                <h3 className="text-xl basis-1/2">
                  <div className="h-7 w-2/3 bg-slate-200 rounded"></div>
                </h3>
                <span className="text-2xl text-blue-700 basis-1/4">
                  <div className="h-8 w-1/2 bg-slate-200 rounded"></div>
                </span>
                <span className="basis-1/4">
                  <div className="h-12 w-12 bg-slate-200 rounded"></div>
                </span>
                <span className="basis-1/4 text-xl">
                  <div className="h-7 w-1/2 bg-slate-200 rounded"></div>
                </span>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default WeatherListLoading
