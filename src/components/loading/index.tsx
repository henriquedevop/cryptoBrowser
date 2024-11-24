import { ArrowPathIcon } from "@heroicons/react/16/solid"

interface LoadingProps{
    message?: string
}

export function Loading({ message }:LoadingProps) {
    return (
        <div className="h-screen w-full flex flex-col items-center justify-center">
            <ArrowPathIcon className="size-14 animate-spin mb-10"/>
            {message && <p className="text-xl">{message}</p>}
        </div>
    )
}