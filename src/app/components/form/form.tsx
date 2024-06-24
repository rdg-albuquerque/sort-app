"use client"

import Button from "@/app/components/button/button"
import { useParticipants } from "@/states/participants"
import { FormEvent, useRef, useState } from "react"

export default function Form() {
  const [inputValue, setInputValue] = useState("")
  const [participants, setParticipants] = useParticipants()
  const [error, setError] = useState("")
  const inputRef = useRef<HTMLInputElement | null>(null)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const isAlreadyInTheList = participants.find(
      (participant) => participant.toLowerCase() === inputValue.toLowerCase()
    )

    if (isAlreadyInTheList) {
      setError("The name is already in the list")
      setTimeout(() => {
        setError("")
      }, 4000)
      return
    }

    setParticipants((current) => [...current, inputValue])
    setInputValue("")
    inputRef.current?.focus()
  }

  return (
    <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
      <input
        ref={inputRef}
        type="text"
        name="participant"
        placeholder="Insert the participants names"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      {error && (
        <p role="alert" className="text-[#d32727]">
          {error}
        </p>
      )}
      <Button disabled={!inputValue} type="submit">
        Submit
      </Button>
    </form>
  )
}
