
import { Separator } from "@/components/ui/separator"
import Modal from "./ui/Modal";
import Table from "./ui/Table"
import Select  from "./ui/Select";
import { Download } from "./ui/Download";

import { PrismaClient } from "@prisma/client";
import Create from "./ui/Create";
import QuitButton from "./ui/QuitButton";

const prisma = new PrismaClient()

export default async function Home(prop: any) {

  const {role, track, isTopSort} = prop.searchParams
  const tracks = await prisma.track.findMany()
  console.log(track)

  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <div className="self-start w-full" >
          <div className="flex justify-between p-2" >
            <h1 className="font-bold text-3xl" >feeder dashboard</h1>

            <div className="flex items-center gap-4" >
              <QuitButton role={role} />
              <Modal role={role} />
            </div>
            
          </div>
          <Separator />
      </div>

      <div className="mt-10 w-full flex flex-col gap-5" >
        <div className="w-full flex justify-between" >
          <Select tracks={tracks} role={role}/>
          {role && 
            <div className="flex gap-4" >
              <Create/>
              <Download/>
            </div>
          }
        </div>
        
        <Table role={role} track={track} isTopSort={isTopSort} />
      </div>
     

    </main>
  );
}
