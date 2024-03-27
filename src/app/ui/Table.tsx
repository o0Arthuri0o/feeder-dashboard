import { Button } from "@/components/ui/button"
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
import { deleteFeeder } from "@/lib/actions"
import EditDelete from "./EditDelete"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();
// const feeders = [
//     {
//         Vessel: "INESSA",
//         Voyage: "223W",
//         ETD: "12.03.2024",
//         ETA:"17.03.2024",
//         POL:"Klang",
//         POD:"Karachi",
//     },
//     {
//         Vessel: "HUA Xin",
//         Voyage: "V. 03-24",
//         ETD: "16.03.2024",
//         ETA:"21.03.2024",
//         POL:"Klang",
//         POD:"Karachi"
//     },
//     {
//         Vessel: "HAFFU LONGER",
//         Voyage: "118HL",
//         ETD: "25.03.2024",
//         ETA:"01.04.2024",
//         POL:"Klang",
//         POD:"Karachi"
//     },
//     {
//         Vessel: "Coral Driver",
//         Voyage: "PKLCMB030",
//         ETD: "01.04.2024",
//         ETA:"06.04.2024",
//         POL:"Klang",
//         POD:"Karachi"
//     }
// ]

  export default async function TableDemo({role}: {role: string}) {
    const feeders = await prisma.feeder.findMany()
    // console.log(feeders)
    return (
      <Table>
        <TableCaption>Таблица актуальных фидеров.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Vessel</TableHead>
            <TableHead>Voyage</TableHead>
            <TableHead>ETD</TableHead>
            <TableHead>ETA</TableHead>
            <TableHead>POL</TableHead>
            <TableHead>POD</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {feeders?.map((feeder) => (
            <TableRow >
              <TableCell className="font-medium">{feeder.Vessel}</TableCell>
              <TableCell>{feeder.Voyage}</TableCell>
              <TableCell>{feeder.ETD}</TableCell>
              <TableCell>{feeder.ETA}</TableCell>
              <TableCell className="font-bold" >{feeder.POL}</TableCell>
              <TableCell className="font-bold" >{feeder.POD}</TableCell>
              {role ? <TableCell className="font-bold" >
                <EditDelete feeder = {feeder} />
              </TableCell> : null}
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