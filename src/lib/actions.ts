"use server"

import { SignJWT, jwtVerify } from "jose";
import { redirect } from 'next/navigation'
import { cookies } from "next/headers";
import { unstable_noStore as noStore, revalidatePath } from 'next/cache';
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()
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
                const deleteFeeder = await prisma.feeder.delete({
                    where: {
                        id: id,
                    }
                })
                revalidatePath('/')
                console.log(deleteFeeder)
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

type FeederProps = {
    id: string,
    Vessel: string,
    Voyage: string,
    ETA: string,
    ETD: string,
    POD: string,
    POL: string,
}
export async function editFeeder(feeder: FeederProps) {
    const session = cookies().get('session')
    if(!session) {
        redirect("/")
    } else {
        const verify = await decrypt(session.value)
        if(verify) {
            const password = verify.password
            if(password === process.env.PASSWORD) {
                // console.log(feeder.id)
                const updateFeeder = await prisma.feeder.update({
                    where: {
                        id: feeder.id,
                    },
                    data: {
                        Vessel:feeder.Vessel,
                        Voyage: feeder.Voyage,
                        ETA: feeder.ETA,
                        ETD: feeder.ETD,
                        POD: feeder.POD,
                        POL: feeder.POL,
                    },
                })
                console.log(updateFeeder)
                revalidatePath('/?role=admin')
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

type FeederAfterXlS = {
    Vessel: string,
    Voyage: string,
    ETD: string,
    ETA: string,
    POD: string,
    POL: string,
}
export async function downloadNewFeeders(feeders: FeederAfterXlS[], tracks: string[]) {
    const session = cookies().get('session')
    if(!session) {
        redirect("/")
    } else {
        const verify = await decrypt(session.value)
        if(verify) {
            const password = verify.password
            if(password === process.env.PASSWORD) {
                // console.log('verify succes')
                saveTracks(tracks)
                
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

const saveTracks = (tracks: string[]) => {
    const arrayOfTrackObj = tracks.map(item => {
        let arrayOfPolPod = item.split('=>')
        let objTrack = {
            POL: arrayOfPolPod[0],
            POD: arrayOfPolPod[1],
        }
        return objTrack
    })
    console.log(arrayOfTrackObj)
}