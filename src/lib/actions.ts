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

export async function deleteFeeder (feeder: FeederProps) {
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
                        compoundFeederId: {
                            Vessel: feeder.Vessel,
                            Voyage: feeder.Voyage,
                            ETD: feeder.ETD,
                            ETA: feeder.ETA,
                            POL: feeder.POL,
                            POD: feeder.POD
                        }
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
    Vessel: string,
    Voyage: string,
    ETA: string,
    ETD: string,
    POD: string,
    POL: string,
}


type FeederEditProps = {
    oldFeeder: {
        Vessel: string,
        Voyage: string,
        ETA: string,
        ETD: string,
        POD: string,
        POL: string,
    }
    newFeeder: {
        Vessel: string,
        Voyage: string,
        ETA: string,
        ETD: string,
        POD: string,
        POL: string,
    }
}
export async function editFeeder(feeder: FeederEditProps) {
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
                        compoundFeederId: {
                            Vessel: feeder.oldFeeder.Vessel,
                            Voyage: feeder.oldFeeder.Voyage,
                            ETD: feeder.oldFeeder.ETD,
                            ETA: feeder.oldFeeder.ETA,
                            POL: feeder.oldFeeder.POL,
                            POD: feeder.oldFeeder.POD
                        }
                    },
                    data: {
                        Vessel:feeder.newFeeder.Vessel,
                        Voyage: feeder.newFeeder.Voyage,
                        ETD: feeder.newFeeder.ETD,
                        ETA: feeder.newFeeder.ETA,
                        POD: feeder.newFeeder.POD,
                        POL: feeder.newFeeder.POL,
                    },
                })
                console.log(updateFeeder)
                revalidatePath('/')
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
export async function downloadNewFeeders({feeders, tracks}: {feeders: string[][], tracks: string[]}) {
    const session = cookies().get('session')
    if(!session) {
        redirect("/")
    } else {
        const verify = await decrypt(session.value)
        if(verify) {
            const password = verify.password
            if(password === process.env.PASSWORD) {
                // console.log('verify succes')
                const upserTracks = await saveTracks(tracks)
                let upsertFeeders;
                if(upserTracks) {
                    upsertFeeders = await saveFeeders(feeders)
                }
                if(upsertFeeders) revalidatePath('/')
                
                
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

const saveTracks = async(tracks: string[]) => {
    const arrayOfTrackObj = tracks.map(item => {
        let arrayOfPolPod = item.split('=>')
        let objTrack = {
            POL: arrayOfPolPod[0],
            POD: arrayOfPolPod[1],
        }
        return objTrack
    })
    for(let track of arrayOfTrackObj) {
        const upsertTrack = await prisma.track.upsert({
            where: {
                compoundTrackId:{
                    POL: track.POL,
                    POD: track.POD
                }
            },
            update: {},
            create: {
                POL: track.POL,
                POD: track.POD
            }
        })
        // console.log(upsertTrack)
    }
    return 1
}

const saveFeeders = async(feeders: string[][]) => {
    for(let feeder of feeders) {
        const upsertFeeder = await prisma.feeder.upsert({
            where: {
               compoundFeederId: {
                Vessel: feeder[0],
                Voyage: feeder[1],
                ETD: feeder[2],
                ETA: feeder[3],
                POL: feeder[4],
                POD: feeder[5],
               }
            },
            update: {},
            create: {
                Vessel: feeder[0],
                Voyage: feeder[1],
                ETD: feeder[2],
                ETA: feeder[3],
                POL: feeder[4],
                POD: feeder[5],
            }
        })
        // console.log(upsertFeeder)
    }
    return 1;
}