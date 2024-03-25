import Image from "next/image";
import { Separator } from "@/components/ui/separator"
import Modal from "./ui/Modal";
import Table from "./ui/Table"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-12">
      <div className="self-start w-full" >
          <div className="flex justify-between p-2" >
            <h1 className="font-bold text-3xl" >feeder dashboard</h1>
            <Modal/>
          </div>
          <Separator />
      </div>

      <div className="mt-10 w-full" >
         <Table/>
      </div>
     

    </main>
  );
}
