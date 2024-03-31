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
import { useEffect, useRef, useState } from "react"
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

function ExcelDateToJSDate(serial: number) {
  var utc_days  = Math.floor(serial - 25569);
  var utc_value = utc_days * 86400;                                        
  var date_info = new Date(utc_value * 1000);

  var fractional_day = serial - Math.floor(serial) + 0.0000001;

  var total_seconds = Math.floor(86400 * fractional_day);

  var seconds = total_seconds % 60;

  total_seconds -= seconds;

  var hours = Math.floor(total_seconds / (60 * 60));
  var minutes = Math.floor(total_seconds / 60) % 60;
  let rusData =  new Date(date_info.getFullYear(), date_info.getMonth(), date_info.getDate(), hours, minutes, seconds).toLocaleString("ru");
  rusData = rusData.split(', ')[0]
  return rusData
}


  export function Download({role}: {role: string}) {
    const refInput = useRef<HTMLInputElement | null>(null)
    const [dataInput, setDataInput] = useState<FeederAfterXlS[] | null>()
    const [fileName, setFileName] = useState('')

    const upload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setFileName(file.name)
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

    let feeders: string[][] = []
    useEffect(() => {
      if(dataInput) {
        console.log(dataInput)
        for(let item of dataInput) {
          let feederSmallArray = [
            item.Vessel,
            item.Voyage,
            `${ExcelDateToJSDate(+item.ETD)}`,
            `${ExcelDateToJSDate(+item.ETA)}`,
            item.POL,
            item.POD
          ]
          feeders.push(feederSmallArray)
        }
        console.log(feeders)
      }
    }, [dataInput])
  
    let tracks: any[] | null = null;
    if(dataInput){
      let setOfTracks = new Set();
      for(let feeder of dataInput) {
        let track = `${feeder.POL}=>${feeder.POD}`
        setOfTracks.add(track)
      }
     
      tracks = Array.from(setOfTracks)
    }
    
    const handleClick = () => {
      if(tracks) downloadNewFeeders({feeders: feeders, tracks})
      setDataInput(null)
      setFileName('')
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
          <p className="flex justify-center" >{fileName}</p>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            {tracks ? 
              <AlertDialogAction onClick={() => dataInput&&tracks ? handleClick() : null} >
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