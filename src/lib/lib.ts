import { redirect } from "next/navigation"
import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./actions";
import { unstable_noStore as noStore } from 'next/cache';


export async function checkSession(request: NextRequest) {
    noStore()
    console.log("first")
    const session = request.cookies.get('session')?.value
    if(!session) redirect("/role=user")
    else {
        const test = await decrypt(session)
        console.log(test)
        console.log(session)
    }
}