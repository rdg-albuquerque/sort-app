import Sorter from "@/app/sorter/page"
import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react"
import { RecoilRoot } from "recoil"
import { useParticipants, useSelectedParticipant } from "@/states/participants"

jest.mock("@/states/participants", () => {
  const actualState = jest.requireActual("@/states/participants")
  return {
    ...actualState,
    useParticipants: jest.fn(),
  }
})

describe("Select participants", () => {
  const list = ["Rodrigo", "Maria", "João"]
  beforeEach(() => {
    ;(useParticipants as jest.Mock).mockReturnValue([list])
  })
  test("It's rendered on the page", () => {
    render(
      <RecoilRoot>
        <Sorter />
      </RecoilRoot>
    )

    const select = screen.getByTestId("select")

    expect(select).toBeInTheDocument()
  })
  test("It starts with the 'default' option selected", () => {
    render(
      <RecoilRoot>
        <Sorter />
      </RecoilRoot>
    )

    const select = screen.getByTestId("select")

    expect(select).toHaveValue("default")
  })
  test("The options matches with the list of participants", () => {
    render(
      <RecoilRoot>
        <Sorter />
      </RecoilRoot>
    )
    ;(useParticipants as jest.Mock).mockReturnValue([list])

    const options = screen.queryAllByRole("option")

    expect(options).toHaveLength(list.length)
  })

  const TestComponent = () => {
    const { selectedParticipant } = useSelectedParticipant()
    return <div data-testid="test-component">{selectedParticipant}</div>
  }

  test("The selectedParticipant is set when the value of the select element changes", async () => {
    render(
      <RecoilRoot>
        <Sorter />
        <TestComponent />
      </RecoilRoot>
    )

    const select = screen.getByRole("combobox")
    act(() => fireEvent.change(select, { target: { value: "Rodrigo" } }))

    const selectedParticipantElement = screen.getByTestId("test-component")
    await waitFor(() => {
      expect(select).toHaveValue(selectedParticipantElement.textContent)
    })
  })
})
