import { useState } from 'react'
import { MagnifyingGlass, X } from '@phosphor-icons/react'
import { Input } from './ui/input'
import { Button } from './ui/button'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = 'Cari thread...' }: SearchBarProps) {
  const [query, setQuery] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(query)
  }

  const handleClear = () => {
    setQuery('')
    onSearch('')
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <div className="relative">
        <MagnifyingGlass 
          size={20} 
          weight="bold"
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={placeholder}
          className="pl-10 pr-20"
        />
        {query && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
          >
            <X size={16} weight="bold" />
          </Button>
        )}
      </div>
    </form>
  )
}
