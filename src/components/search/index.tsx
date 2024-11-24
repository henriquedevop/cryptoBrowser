import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

export function Search() {
  return (
    <form className="flex items-center">
      <div className="relative flex gap-5">
        <input
          type="text"
          placeholder="Search"
          className="md:w-64 md:focus:w-80 bg-gray-100 rounded-md pl-10 pr-3 py-1 w-28 transition-all duration-300 ease-in-out focus:w-48 focus:pl-12"
        />
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-500" />
      </div>
    </form>
  );
}
