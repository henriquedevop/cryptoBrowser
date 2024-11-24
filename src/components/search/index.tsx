import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router";

export function Search() {

  const [input, setInput] = useState("")

  const navigate = useNavigate()

  function handleSubmit(e:FormEvent) {
    e.preventDefault()

    if(input === "") return

    navigate(`/detail/${input.trim()}`)
  }
  
  return (
    <form onSubmit={handleSubmit} className="flex items-center">
      <div className="relative flex gap-5">
        <input
          type="text"
          placeholder="Search"
          className="md:w-64 md:focus:w-80 bg-gray-200 rounded-md pl-10 pr-3 py-1 w-28 transition-all duration-300 ease-in-out focus:w-40 focus:pl-12"
          value={input}
          onChange={ (e) => setInput(e.target.value) }
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
      </div>
    </form>
  );
}
