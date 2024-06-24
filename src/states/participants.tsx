"use client"

import { PropsWithChildren } from "react"
import { RecoilRoot, atom, useRecoilState } from "recoil"

export const ParticipantsProvider = ({ children }: PropsWithChildren) => {
  return <RecoilRoot>{children}</RecoilRoot>
}

const participantsState = atom<string[]>({
  key: "participants",
  default: ["Rodrigo", "João", "Maria", "Ana"],
})

export const useParticipants = () => {
  return useRecoilState(participantsState)
}

const selectedParticipantState = atom<string>({
  key: "selectedParticipant",
  default: "",
})

export const useSelectedParticipant = () => {
  const [selectedParticipant, setSelectedParticipant] = useRecoilState(
    selectedParticipantState
  )

  return {
    selectedParticipant,
    setSelectedParticipant,
  }
}
