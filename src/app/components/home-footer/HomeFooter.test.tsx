import { fireEvent, render, screen } from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useParticipants } from "@/states/participants"
import HomeFooter from "@/app/components/home-footer/HomeFooter"
import { useSorter } from "@/states/sorter"

jest.mock("@/states/participants", () => {
  return {
    useParticipants: jest.fn(),
  }
})

const pushMock = jest.fn()
jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: pushMock,
    }),
  }
})

const sort = jest.fn()
jest.mock("@/states/sorter", () => {
  return {
    useSorter: () => sort,
  }
})

describe("Start Button", () => {
  test("Start button is disabled if list length is smaller than 3", () => {
    ;(useParticipants as jest.Mock).mockReturnValue([[]])

    render(
      <RecoilRoot>
        <HomeFooter />
      </RecoilRoot>
    )

    const btn = screen.getByRole("button")

    expect(btn).toBeDisabled()
  })

  test("Start button is enabled if list length is equal or greater than 3", () => {
    ;(useParticipants as jest.Mock).mockReturnValue([
      ["Rodrigo", "Maria", "João"],
    ])

    render(
      <RecoilRoot>
        <HomeFooter />
      </RecoilRoot>
    )

    const btn = screen.getByRole("button")

    expect(btn).toBeEnabled()
  })

  test("Start button is redirecting correctly", () => {
    ;(useParticipants as jest.Mock).mockReturnValue([
      ["Rodrigo", "Maria", "João"],
    ])

    render(
      <RecoilRoot>
        <HomeFooter />
      </RecoilRoot>
    )

    const btn = screen.getByRole("button")
    expect(btn).toBeEnabled()
    fireEvent.click(btn)
    expect(pushMock).toHaveBeenCalledWith("/sorter")
    expect(pushMock).toHaveBeenCalledTimes(1)
  })

  test("Sorter function is called when clicking on start button", () => {
    ;(useParticipants as jest.Mock).mockReturnValue([
      ["Rodrigo", "Maria", "João"],
    ])

    render(
      <RecoilRoot>
        <HomeFooter />
      </RecoilRoot>
    )

    const btn = screen.getByRole("button")
    expect(btn).toBeEnabled()
    fireEvent.click(btn)
    expect(sort).toHaveBeenCalledTimes(1)
  })
})
