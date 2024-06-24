import { act, fireEvent, render, screen } from "@testing-library/react"
import Form from "@/app/components/form/form"
import { RecoilRoot } from "recoil"
import List from "@/app/components/list/list"

describe("Form", () => {
  test("Can't submit if input is empty", () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    )
    const participantInput = screen.getByPlaceholderText(
      /Insert the participants names/i
    )
    const submitButton = screen.getByRole("button")
    expect(participantInput).toBeInTheDocument()
    expect(submitButton).toBeDisabled()
  })

  test("Can add participant if input is not empty and form is submitted", () => {
    render(
      <RecoilRoot>
        <Form />
      </RecoilRoot>
    )

    const participantInput = screen.getByPlaceholderText(
      /Insert the participants names/i
    )

    fireEvent.change(participantInput, {
      target: {
        value: "Ju",
      },
    })
    expect(participantInput).toHaveValue("Ju")

    const submitButton = screen.getByRole("button")
    fireEvent.click(submitButton)

    expect(participantInput).toHaveFocus()
    expect(participantInput).toHaveValue("")
  })

  test("Can't add duplicated participants in the list", () => {
    render(
      <RecoilRoot>
        <Form />
        <List />
      </RecoilRoot>
    )

    const changeInputValue = () => {
      fireEvent.change(participantInput, {
        target: {
          value: "Ju",
        },
      })
    }

    const participantInput = screen.getByPlaceholderText(
      /Insert the participants names/i
    )
    const submitButton = screen.getByRole("button")

    changeInputValue()
    fireEvent.click(submitButton)
    expect(participantInput).toHaveValue("")

    changeInputValue()
    fireEvent.click(submitButton)
    const errorMessage = screen.getByRole("alert")
    expect(errorMessage).toBeInTheDocument()
    expect(errorMessage).toHaveTextContent("The name is already in the list")
  })

  test("Error message goes away after N seconds", () => {
    jest.useFakeTimers()
    render(
      <RecoilRoot>
        <Form />
        <List />
      </RecoilRoot>
    )

    const changeInputValue = () => {
      fireEvent.change(participantInput, {
        target: {
          value: "Ju",
        },
      })
    }

    const participantInput = screen.getByPlaceholderText(
      /Insert the participants names/i
    )
    const submitButton = screen.getByRole("button")

    changeInputValue()
    fireEvent.click(submitButton)
    expect(participantInput).toHaveValue("")

    changeInputValue()
    fireEvent.click(submitButton)
    let errorMessage = screen.queryByRole("alert")
    expect(errorMessage).toBeInTheDocument()

    act(() => {
      jest.runAllTimers()
    })

    errorMessage = screen.queryByRole("alert")
    expect(errorMessage).not.toBeInTheDocument()
  })
})
