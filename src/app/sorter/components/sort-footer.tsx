"use client"

import Button from "@/app/components/button/button"
import { useSelectedParticipant } from "@/states/participants"
import { useSortResult } from "@/states/sorter"
import { useRef, useState } from "react"

export default function SortFooter() {
  const [sortResult] = useSortResult()
  const [matchingPair, setMatchingPair] = useState("")
  const { selectedParticipant } = useSelectedParticipant()
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const handleClick = () => {
    setMatchingPair(sortResult.get(selectedParticipant) || "")
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(() => {
      setMatchingPair("")
    }, 5000)
  }
  return (
    <>
      <Button onClick={handleClick}>Sortear!</Button>
      {matchingPair && <p role="alert">{matchingPair}</p>}
    </>
  )
}
