"use client"

import { ChangeEvent } from "react"
import { useParticipants, useSelectedParticipant } from "@/states/participants"

export default function SelectParticipants() {
  const [participants] = useParticipants()
  const { setSelectedParticipant } = useSelectedParticipant()

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedParticipant(e.target.value)
  }

  return (
    <form>
      <select
        data-testid="select"
        className="text-black"
        name="participants-select"
        id="participants-select"
        defaultValue="default"
        onChange={handleChange}
      >
        <option className="text-black" value="default" disabled hidden>
          Selecione seu nome
        </option>
        {participants.map((participant) => {
          return (
            <option
              className="text-black"
              key={participant}
              value={participant}
            >
              {participant}
            </option>
          )
        })}
      </select>
    </form>
  )
}
