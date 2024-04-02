import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import EditDelete from "./EditDelete"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
import { unstable_noStore as noStore } from "next/cache";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import SortButton from "./SortButton";

  export default async function TableDemo({role, track, isTopSort}: {role: string|undefined, track: string|undefined, isTopSort: string | undefined}) {
    noStore()
    let feeders;
    if(track && track !== '-') {
        // track = track.slice(1)
        const [POL, POD] = track.split('=>')
        console.log(POL.trim(),POD.trim())
       feeders = await prisma.feeder.findMany({
        where: {
          AND: [
            { POL: POL.trim() },
            { POD: POD.trim() },
          ],
        },
      })
    } else if(track === "-") {
      if(role) {
        redirect('/?role=admin')
      } else {
        redirect('/')
      }
    } else {
       feeders = await prisma.feeder.findMany()
    }


    if(isTopSort && isTopSort.trim() === 'false') {
      feeders = feeders.sort((a, b) => {
        const dateA = new Date(a.ETD.trim().split('.').reverse().join('-'));
        const dateB = new Date(b.ETD.trim().split('.').reverse().join('-'));
        console.log(dateA.getTime() - dateB.getTime(), dateA, dateB)
        return dateA.getTime() - dateB.getTime();
      });
      
    } else {
      feeders = feeders.sort((a, b) => {
        const dateA = new Date(a.ETD.trim().split('.').reverse().join('-'));
        const dateB = new Date(b.ETD.trim().split('.').reverse().join('-'));
        return dateB.getTime() - dateA.getTime();
      });
    }
    
   
        
    return (
      <Table>
        <TableCaption>Таблица актуальных фидеров.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Vessel</TableHead>
            <TableHead>Voyage</TableHead>
            <TableHead className="flex items-center" >
              ETD
              <SortButton/>
            </TableHead>
            <TableHead>ETA</TableHead>
            <TableHead>POL</TableHead>
            <TableHead>POD</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feeders?.map((feeder) => (
            <TableRow key={feeder.Voyage+feeder.Vessel+feeder.ETA+feeder.ETD}>
              <TableCell className="font-medium">{feeder.Vessel}</TableCell>
              <TableCell>{feeder.Voyage}</TableCell>
              <TableCell>{feeder.ETD}</TableCell>
              <TableCell>{feeder.ETA}</TableCell>
              <TableCell className="font-bold" >{feeder.POL}</TableCell>
              <TableCell className="font-bold" >{feeder.POD}</TableCell>
              {role ? <TableCell className="font-bold" >
                <EditDelete feeder = {feeder} />
                </TableCell> 
                : null
              }
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={1}>Всего</TableCell>
            <TableCell colSpan={5} className="text-right" >{feeders.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    )
  }