"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
  import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { checkPassword, editFeeder } from "@/lib/actions"
import { useState } from "react"

type EditProps = {
    id: string,
    Vessel: string,
    Voyage: string,
    ETA: string,
    ETD: string,
    POD: string,
    POL: string,
}

function Edit({feeder}: {feeder: EditProps}) {
    const [inputFeeder, setFeederStateInput] = useState({
        id: feeder.id,
        Vessel: feeder.Vessel,
        Voyage: feeder.Voyage,
        ETA: feeder.ETA,
        ETD: feeder.ETD,
        POD: feeder.POD,
        POL: feeder.POL,
    })

    return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="outline" className="p-2" >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
                </svg>
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Редактирование</AlertDialogTitle>
                {/* <AlertDialogDescription>
                    Введите код доступа
                </AlertDialogDescription> */}
            </AlertDialogHeader>
            <div className="flex gap-7 items-center" >
                Vessel
                <Input value={inputFeeder.Vessel} onChange={(e) => setFeederStateInput({...inputFeeder, Vessel: e.target.value})} />
            </div>
            <div className="flex gap-5 items-center" >
                Voyage
                <Input value={inputFeeder.Voyage} onChange={(e) => setFeederStateInput({...inputFeeder, Voyage: e.target.value})} />
            </div>
            <div className="flex gap-11 items-center" >
                ETD
                <Input value={inputFeeder.ETD} onChange={(e) => setFeederStateInput({...inputFeeder, ETD: e.target.value})} />
            </div>
            <div className="flex gap-11 items-center" >
                ETA
                <Input value={inputFeeder.ETA} onChange={(e) => setFeederStateInput({...inputFeeder, ETA: e.target.value})} />
            </div>
            <div className="flex gap-10 items-center" >
                POL
                <Input value={inputFeeder.POL} onChange={(e) => setFeederStateInput({...inputFeeder, POL: e.target.value})} />
            </div>
            <div className="flex gap-9 items-center" >
                POD
                <Input value={inputFeeder.POD} onChange={(e) => setFeederStateInput({...inputFeeder, POD: e.target.value})} />
            </div>
            
            <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={() => editFeeder(inputFeeder)} >Продолжить</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

    
  )
}

export default Edit