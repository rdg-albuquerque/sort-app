import SelectParticipants from "@/app/components/select-participants/select-participants"
import SortFooter from "@/app/sorter/components/sort-footer"
import Link from "next/link"

export default function Sorter() {
  return (
    <div className="flex min-h-screen flex-col items-center gap-24 p-24">
      <h1>Quem vai tirar o papelzinho?</h1>
      <SelectParticipants />
      <p>Clique em sortear para ver quem é seu amigo secreto</p>
      {/* button */}
      <SortFooter />
      {/* result */}
      {/* icon */}
      <Link href="/">Home</Link>
    </div>
  )
}
