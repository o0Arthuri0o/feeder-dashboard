"use client"

import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"


function SortButton() {
    const [isTopSort, setIsTopSort] = useState(true)
    let path = '/'
    const router = useRouter()
    const params = useSearchParams()
    if(params.has('role')) path += '?role=admin'
    if(params.has('track')) {
        let track = params.get('track')
        path += `&&track=${track}`
    }

    const handleClick = () => {
        setIsTopSort(prev => !prev)
        if(isTopSort){
            router.push(path+'&&isTopSort=false')
        } else router.push(path+'&&isTopSort=true')
    }
  return (
    
    <Button variant="ghost"  className="p-1"  onClick={() => handleClick()}>
        {isTopSort ? 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18" />
            </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5  ">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3" />
            </svg>
        }
    </Button>
  )
}

export default SortButton