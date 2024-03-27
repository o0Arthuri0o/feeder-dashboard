
import { Separator } from "@/components/ui/separator"
import Modal from "./ui/Modal";
import Table from "./ui/Table"
import Select  from "./ui/Select";
import { useSearchParams } from "next/navigation";
import { Download } from "./ui/Download";

export default function Home(prop: any) {
  const {role} = prop.searchParams
  
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
          <Select/>
          <Download role={role} />
        </div>
        
        <Table role={role} />
      </div>
     

    </main>
  );
}
