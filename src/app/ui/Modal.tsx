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


function Modal() {
  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button variant="outline">Admin</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Хотите войти в админ панель?</AlertDialogTitle>
                <AlertDialogDescription>
                    Введите код доступа
                </AlertDialogDescription>
            </AlertDialogHeader>
            <Input/>
            <AlertDialogFooter>
                <AlertDialogCancel>Отмена</AlertDialogCancel>
                <AlertDialogAction onClick={() => console.log("first")} >Продолжить</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  )
}

export default Modal