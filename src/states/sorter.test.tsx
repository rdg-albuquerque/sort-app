import { makeSort, useSortResult } from "@/states/sorter"
import shuffle from "just-shuffle"

const participantsMock = [
  "Ana",
  "Bruno",
  "Carla",
  "Daniel",
  "Eduardo",
  "Fernanda",
  "Gustavo",
  "Helena",
  "Igor",
  "Juliane",
  "Leonardo",
  "Mariana",
  "Natália",
  "Otávio",
  "Patrícia",
]

const shuffledParticipants = participantsMock.reverse()

jest.mock("just-shuffle", () => {
  return jest.fn()
})
describe("Sorter", () => {
  beforeAll(() => {
    jest.clearAllMocks()
    ;(shuffle as jest.Mock).mockReturnValue(shuffledParticipants)
  })
  test("Each participant doesn't sort it's own name", () => {
    const sortResult = makeSort(participantsMock)

    participantsMock.forEach((participant) => {
      expect(participant).not.toEqual(sortResult.get(participant))
    })
  })

  test("Each participant gets the correct pair", () => {
    const sortResult = makeSort(participantsMock)

    shuffledParticipants.forEach((participant, index) => {
      const matchPairIndex =
        index === shuffledParticipants.length - 1 ? 0 : index + 1

      expect(sortResult.get(participant)).toEqual(
        shuffledParticipants[matchPairIndex]
      )
    })
  })
})
