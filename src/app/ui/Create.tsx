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
import { createNewFeeder } from "@/lib/actions"
import {useState } from "react"
import { DatePickerDemo } from "./DatePicker"

export type CreateFeeder = {
    Vessel: string,
    Voyage: string,
    ETA: string,
    ETD: string,
    POD: string,
    POL: string,
}

function Create() {
    const [inputFeeder, setFeederStateInput] = useState<CreateFeeder>({
        Vessel: '',
        Voyage: '',
        ETA: '',
        ETD: '',
        POD: '',
        POL: '',
    })

    const handleClick = (inputFeeder: CreateFeeder) => {
        createNewFeeder(inputFeeder)
        
        setFeederStateInput({
            Vessel: '',
            Voyage: '',
            ETA: '',
            ETD: '',
            POD: '',
            POL: '',
        })
    }

    return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="ghost" className="p-2" >
               Создать
            </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Создать новый фидер</AlertDialogTitle>
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
                <DatePickerDemo onChange={(e: string) => setFeederStateInput({...inputFeeder, ETD: e})} />
                {/* <Input value={inputFeeder.ETD} onChange={(e) => setFeederStateInput({...inputFeeder, ETD: e.target.value})} /> */}
            </div>
            <div className="flex gap-11 items-center" >
                ETA
                <DatePickerDemo onChange={(e: string) => setFeederStateInput({...inputFeeder, ETA: e})}/>
                {/* <Input value={inputFeeder.ETA} onChange={(e) => setFeederStateInput({...inputFeeder, ETA: e.target.value})} /> */}
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
                <AlertDialogAction onClick={() => handleClick(inputFeeder)} >Создать</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>

    
  )
}

export default Create