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
import { useRef } from "react"
   
  export function Download({role}: {role: string}) {
    const refInput = useRef<HTMLInputElement | null>(null)
 
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
          <input type="file" accept=".xls, .xlsx" ref={refInput}  className="h-0 w-0 opacity-0 m-0"/>
          <Button onClick={() => refInput.current?.click()} >Загрузить</Button>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction disabled >Продолжить</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      :
      null
    )
    )
  }