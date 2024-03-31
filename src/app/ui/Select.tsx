"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

type TrackProps = {
    POL: string,
    POD: string,
}

export default function SelectDemo({tracks, role}: {tracks: TrackProps[], role: string|undefined}) {
    const [currentTrack, setCurrentTrack] = useState('')
    const router = useRouter()
    useEffect(() => {
        if(currentTrack !== "" && currentTrack){
            if(role || currentTrack !== "-") {
                router.push(`/?role=admin&&track=${currentTrack}`)
            } else if(role && currentTrack === "-"){
                router.push(`/?role=admin`)
            } else if(currentTrack === "-") {
                router.push(`/?role=admin`)
            } else {
                router.push(`/?role=admin&&track=${currentTrack}`)
            }
        }
    }, [currentTrack])

    return (
        <Select onValueChange={(e) => setCurrentTrack(e)} defaultValue="" >
        <SelectTrigger className="w-[180px]" >
            <SelectValue placeholder="Все маршруты" />
        </SelectTrigger>
        <SelectContent >
            <SelectGroup >
                <SelectItem value="-">{`Все маршруты`}</SelectItem>
                {/* <SelectItem value="Klanh => Karachi">{`Klanh => Karachi`}</SelectItem> */}
                {tracks.map(track => 
                    <SelectItem key={track.POL+track.POD} value={`${track.POL} => ${track.POD}`}
                        
                    >{`${track.POL} => ${track.POD}`}</SelectItem>
                )}
      
            </SelectGroup>
        </SelectContent>
        </Select>
    )
}