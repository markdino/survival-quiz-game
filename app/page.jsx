import { metadata } from '@app/layout'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <section>Home page</section>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">{metadata?.title}</h1>
      </div>
    </main>
  )
}
