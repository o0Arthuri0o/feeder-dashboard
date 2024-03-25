import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"


export default function SelectDemo() {
    return (
        <Select>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Все маршруты" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
                <SelectItem value="-">{`Все маршруты`}</SelectItem>
                <SelectLabel>Найти</SelectLabel>
                <SelectItem value="Klanh => Karachi">{`Klanh => Karachi`}</SelectItem>
      
            </SelectGroup>
        </SelectContent>
        </Select>
    )
}