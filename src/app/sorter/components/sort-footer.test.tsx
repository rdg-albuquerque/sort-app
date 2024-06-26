import { act, fireEvent, render, screen, waitFor } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import SortFooter from "./sort-footer"

jest.useFakeTimers()

jest.mock("@/states/participants", () => {
  return {
    useSelectedParticipant: jest.fn(() => {
      return {
        selectedParticipant: "Leo",
      }
    }),
  }
})

const map = new Map([
  ["Rodrigo", "Ju"],
  ["Leo", "Ana"],
  ["Rafael", "Thiago"],
])

jest.mock("@/states/sorter", () => {
  return {
    useSortResult: jest.fn(() => [map]),
  }
})

describe("sort-footer", () => {
  test("Shows the correct matching pair", () => {
    render(
      <>
        <RecoilRoot>
          <SortFooter />
        </RecoilRoot>
      </>
    )

    const button = screen.getByRole("button")
    fireEvent.click(button)

    const matchingPair = screen.getByRole("alert")
    expect(matchingPair).toBeInTheDocument()
    expect(matchingPair.textContent).toBe("Ana")
  })

  test("Matching pair name disappear after N seconds", () => {
    render(
      <>
        <RecoilRoot>
          <SortFooter />
        </RecoilRoot>
      </>
    )

    const button = screen.getByRole("button")
    fireEvent.click(button)

    const matchingPair = screen.getByRole("alert")
    expect(matchingPair).toBeInTheDocument()

    act(() => {
      jest.runAllTimers()
    })

    expect(matchingPair).not.toBeInTheDocument()
  })
})
