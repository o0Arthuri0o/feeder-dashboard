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
import { checkPassword } from "@/lib/actions"
import { useState } from "react"


function Modal({role}: {role: string}) {
    const [password, setPasword] = useState('')
    const handleClick = () => {
        checkPassword(password)
        setPasword('')
    }

  return (
    (role !== "admin" ? 
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="outline">Админ</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Хотите войти в админ панель?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Введите код доступа
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <Input value={password} onChange={(e) => setPasword(e.target.value)} />
                <AlertDialogFooter>
                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleClick()} >Продолжить</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
        :
        <h2>Админ мод</h2>
    )
    
  )
}

export default Modal