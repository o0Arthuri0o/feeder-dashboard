
import { Separator } from "@/components/ui/separator"
import Modal from "./ui/Modal";
import Table from "./ui/Table"
import Select  from "./ui/Select";
import { Download } from "./ui/Download";
import { unstable_noStore as noStore } from "next/cache";
import { PrismaClient } from "@prisma/client";
import { Button } from "@/components/ui/button";
import Create from "./ui/Create";
import clsx from "clsx";
const prisma = new PrismaClient()

export default async function Home(prop: any) {
  noStore()
  const {role, track} = prop.searchParams
  const tracks = await prisma.track.findMany()
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <div className="self-start w-full" >
          <div className="flex justify-between p-2" >
            <h1 className="font-bold text-3xl" >feeder dashboard</h1>
            <Modal role={role} />
          </div>
          <Separator />
      </div>

      <div className="mt-10 w-full flex flex-col gap-5" >
        <div className="w-full flex justify-between" >
          <Select tracks={tracks} role={role}/>
          <div className="flex gap-4" >
            <Create/>
            <Download role={role} />
          </div>
        </div>
        
        <Table role={role} track={track} />
      </div>
     

    </main>
  );
}
