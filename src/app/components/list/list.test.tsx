import { render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import List from "@/app/components/list/list"
import { useParticipants } from "@/states/participants"

jest.mock("@/states/participants", () => {
  return {
    useParticipants: jest.fn(),
  }
})
const participantsHookMock = useParticipants as jest.Mock

describe("Empty list", () => {
  beforeEach(() => {
    participantsHookMock.mockReturnValue([[]])
  })

  test("List initiates empty", () => {
    render(
      <RecoilRoot>
        <List />
      </RecoilRoot>
    )

    const listItems = screen.queryAllByRole("listitem")

    expect(listItems).toHaveLength(0)
  })
})

describe("Fullfilled list", () => {
  beforeEach(() => {
    participantsHookMock.mockReturnValue([["João", "Maria"]])
  })

  test("List initiates empty", () => {
    render(
      <RecoilRoot>
        <List />
      </RecoilRoot>
    )

    const listItems = screen.queryAllByRole("listitem")

    expect(listItems).toHaveLength(2)
  })
})
