"use client"

import Button from "@/app/components/button/button"
import { useParticipants } from "@/states/participants"
import { useSorter } from "@/states/sorter"
import { useRouter } from "next/navigation"

export default function HomeFooter() {
  const [participants] = useParticipants()
  const sort = useSorter()
  const router = useRouter()
  return (
    <div>
      <Button
        onClick={() => {
          sort()
          router.push("/sorter")
        }}
        disabled={participants.length < 3}
      >
        Iniciar brincadeira
      </Button>
    </div>
  )
}
