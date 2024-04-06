'use client'
import { Button } from '@/components/atoms'

export default function ErrorHomePage({ error, reset }: any) {
  return (
    <div className="bg-red-400 p-4 flex rounded-lg gap-4 items-center">
      <h2 className="grow text-xl text-white">Something went wrong!</h2>
      <Button className="bg-red-600 hover:bg-red-700" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  )
}
