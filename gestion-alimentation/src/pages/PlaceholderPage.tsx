type PlaceholderPageProps = {
  title: string
  description: string
}

export default function PlaceholderPage({
  title,
  description,
}: PlaceholderPageProps) {
  return (
    <section className="bg-white rounded-xl shadow border border-gray-200 p-6">
      <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
      <p className="text-gray-500 mt-2">{description}</p>
    </section>
  )
}
