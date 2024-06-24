"use client"

import { useParticipants } from "@/states/participants"

export default function List() {
  const [participants] = useParticipants()

  return (
    <ul>
      {participants.map((participant) => {
        return (
          <li className="text-white" key={participant}>
            {participant}
          </li>
        )
      })}
    </ul>
  )
}
