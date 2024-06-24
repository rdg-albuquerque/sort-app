"use client"

import shuffle from "just-shuffle"
import { atom, useRecoilState } from "recoil"
import { useParticipants } from "@/states/participants"

export const sortResultState = atom<Map<string, string>>({
  key: "sortResult",
  default: new Map(),
})

export function useSortResult() {
  return useRecoilState(sortResultState)
}

export function useSorter() {
  const [participants] = useParticipants()
  const [_, setSortResult] = useSortResult()

  return () => {
    const result = makeSort(participants)
    setSortResult(result)
  }
}

export function makeSort(participants: string[]) {
  const result = new Map<string, string>()
  const shuffledParticipants = shuffle(participants)

  for (let i = 0; i < shuffledParticipants.length; i++) {
    const currentParticipant = shuffledParticipants[i]
    const nextParticipant =
      i === shuffledParticipants.length - 1
        ? shuffledParticipants[0]
        : shuffledParticipants[i + 1]

    result.set(currentParticipant, nextParticipant)
  }
  return result
}
