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
import { downloadNewFeeders } from "@/lib/actions"
import { useRef, useState } from "react"
import React from 'react'
import * as XLSX from 'xlsx'

type FeederAfterXlS = {
  Vessel: string,
  Voyage: string,
  ETD: string,
  ETA: string,
  POD: string,
  POL: string,
}


  export function Download({role}: {role: string}) {
    const refInput = useRef<HTMLInputElement | null>(null)
    const [dataInput, setDataInput] = useState<FeederAfterXlS[]>()

    const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e: ProgressEvent<FileReader>) => {
          const binaryData = e.target?.result;
          if (typeof binaryData === 'string') {
            const workbook = XLSX.read(binaryData, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const parsedData: FeederAfterXlS[] = XLSX.utils.sheet_to_json(sheet);
            setDataInput(parsedData);
          } 
        }
      };
    };
    // console.log(dataInput)
    let tracks: any[] | null = null;
    if(dataInput){
      let setOfTracks = new Set();
      for(let feeder of dataInput) {
        let track = `${feeder.POL}=>${feeder.POD}`
        setOfTracks.add(track)
      }
      console.log(setOfTracks)
      tracks = Array.from(setOfTracks)
    }
    
 
    return (
    (role === "admin" ?
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Загрузить файл</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Загрузка файла</AlertDialogTitle>
            <AlertDialogDescription>
                Выберите один файл формата xlx/xlsx , заполненный по определенному шаблонну.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <input type="file" accept=".xls, .xlsx" ref={refInput} className="h-0 w-0 opacity-0 m-0" onChange={(e) => upload(e)} />
          <Button onClick={() => refInput.current?.click()} >Загрузить</Button>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            {tracks ? 
              <AlertDialogAction onClick={() => dataInput&&tracks ? downloadNewFeeders(dataInput, tracks) : null} >
                Продолжить
              </AlertDialogAction>
              : <AlertDialogAction disabled>Продолжить</AlertDialogAction>
            }
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      :
      null
    )
    )
  }