"use client"

import Button from "@/app/components/button/button"
import { useSortResult } from "@/states/sorter"
import { useState } from "react"

export default function SortFooter() {
  const [sortResult] = useSortResult()
  const [matchingPair, setMatchingPair] = useState("")

  const handleClick = () => {
    setMatchingPair(sortResult.get("Rodrigo") || "") // get value from participants select
  }
  return (
    <>
      <Button onClick={handleClick}>Sortear!</Button>
      {matchingPair && <p>{matchingPair}</p>}
    </>
  )
}
