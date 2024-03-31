"use client"
import { Button } from "@/components/ui/button";
import { quitAdmin } from "@/lib/actions";


function QuitButton({role} : {role: string}) {
  return (
    <>
    {role? 
        <Button onClick={() => quitAdmin()} >Выйти из админ мода</Button> 
    : null}
    </>
  )
}

export default QuitButton