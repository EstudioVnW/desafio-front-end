import { useState } from "react"

interface Props {
  onSearch: (query: string) => void
}

export default function SearchBar({ onSearch }: Props) {
  const [query, setQuery] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim() !== "") {
      onSearch(query.trim())
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Buscar fotos ex: beach, cats, etc"
        className="flex-1 p-2 border border-gray-300 rounded-md"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Buscar
      </button>
    </form>
  )
}
