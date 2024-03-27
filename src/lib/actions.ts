"use server"

import { SignJWT, jwtVerify } from "jose";
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";
import { unstable_noStore as noStore } from 'next/cache';


const secret = process.env.SECRETE_KEY;
const key = new TextEncoder().encode(secret)

async function encrypt(payload: {password: string}) {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('27 hours from now')
        .sign(key)
}

export async function decrypt(input: string): Promise<any> {
    let verifySucces;
    try {
        const { payload } = await jwtVerify(input, key, {
            algorithms: ['HS256']
        })
        verifySucces = payload
    } catch(err) {
        return null
    }
    

    return verifySucces;
}




export async function checkPassword(password: string) {
    noStore()
    // const password = formData.get('password')
    if(process.env.PASSWORD === password) {
        console.log(password)
        console.log(process.env.PASSWORD)
        const expires = new Date(Date.now() + 10 * 1000_000)
        const session = await encrypt({password})

        cookies().set('session', session, {expires: expires, httpOnly: true});
        
        redirect("/?role=admin")
    } else{
        console.log(password)
    }
}

export async function deleteFeeder (id: string) {
    const session = cookies().get('session')
    if(!session) {
        redirect("/")
    } else {
        const verify = await decrypt(session.value)
        if(verify) {
            const password = verify.password
            if(password === process.env.PASSWORD) {
                // console.log('verify succes')
                console.log(id)
            } else {
                // console.log(verify, 'verify wasted')
                redirect("/")
            }
        } else {
            // console.log(verify, 'verify wasted')
            redirect("/")
        }
    }
}

export async function editFeeder(id: string) {
    const session = cookies().get('session')
    if(!session) {
        redirect("/")
    } else {
        const verify = await decrypt(session.value)
        if(verify) {
            const password = verify.password
            if(password === process.env.PASSWORD) {
                console.log(id)

            } else {
                console.log(verify, 'verify wasted')
                redirect("/")
            }
        } else {
            console.log(verify, 'verify wasted')
            redirect("/")
        }
    }
}

type FeederAfterXlS = {
    Vessel: string,
    Voyage: string,
    ETD: string,
    ETA: string,
    POD: string,
    POL: string,
}
export async function downloadNewFeeders(feeders: FeederAfterXlS[]) {
    const session = cookies().get('session')
    if(!session) {
        redirect("/")
    } else {
        const verify = await decrypt(session.value)
        if(verify) {
            const password = verify.password
            if(password === process.env.PASSWORD) {
                // console.log('verify succes')
                
            } else {
                // console.log(verify, 'verify wasted')
                redirect("/")
            }
        } else {
            // console.log(verify, 'verify wasted')
            redirect("/")
        }
    }
}