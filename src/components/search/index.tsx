import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { FormEvent, useState, useEffect, useRef } from "react";
import api from "../../services/cryptoService";
import { useNavigate } from "react-router";

export function Search() {

  const [input, setInput] = useState("")
  const [cryptoList, setCryptoList] = useState<string[]>([])
  const [suggestions, setSuggestions] = useState<string[]>([])
  const navigate = useNavigate()

  const inputRef = useRef<HTMLInputElement | null>(null)
  const suggestionRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    filterCrypto()
  },[])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if(
        inputRef.current && !inputRef.current.contains(event.target as Node) &&
        suggestionRef.current && !suggestionRef.current.contains(event.target as Node)
      ) {
        setSuggestions([])
      }
    };

    document.addEventListener("mousedown", handleClickOutside)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  },[])

  async function filterCrypto() {
    try {
      const response = await api.get("assets")

      const crypto = response.data.data.map((item: { name: string}) => item.name)
      setCryptoList(crypto)
    } catch {
      console.log("error")
    }
  }

  function formattedForUrl(input: string): string {
    return input.trim().toLowerCase().replace(/\s+/g, "-")
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value
    setInput(value)
    
    if(value) {
      const filteredSuggestions = cryptoList.filter((crypto) => {
        return crypto.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      })
      setSuggestions(filteredSuggestions)
    } else {
      setSuggestions([])
    }
  }

  function handleSubmit(e:FormEvent) {
    e.preventDefault()

    if(input === "") return

    const formattedInput = formattedForUrl(input.trim())

    navigate(`/detail/${formattedInput}`)
  }

  function handleSuggestionClick(crypto: string) {

    const formattedSuggestion = formattedForUrl(crypto.trim())

    navigate(`/detail/${formattedSuggestion}`)

    setInput(crypto)

    setSuggestions([])
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <div className="relative w-full">
      <div className="flex gap-5">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search"
          className="md:w-64 md:focus:w-80 bg-gray-200 rounded-md pl-10 pr-3 py-1 w-28 transition-all duration-300 ease-in-out focus:w-40 focus:pl-12"
          value={input}
          onChange={handleInputChange}
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
      </div>
      
      {suggestions.length > 0 && (
        <ul 
        ref={suggestionRef}
        className="absolute top-full left-0 mt-2 w-80 border bg-gray-50 border-gray-300 rounded-md shadow-lg z-10">
          {suggestions.map((crypto) => (
            <li 
            key={crypto}
            className="cursor-pointer px-4 py-2 border-b hover:bg-white"
            onClick={() => handleSuggestionClick(crypto)}
            >
              {crypto}
            </li>
          ))}
        </ul>
      )}
      </div>
    </form>
  );
}
