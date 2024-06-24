import "@testing-library/jest-dom"
import { render } from "@testing-library/react"
import Home from "@/app/page"
import { RecoilRoot } from "recoil"

const pushMock = jest.fn()
jest.mock("next/navigation", () => {
  return {
    useRouter: () => ({
      push: pushMock,
    }),
  }
})

describe("Homepage", () => {
  test("renders homepage correctly", () => {
    const { container } = render(
      <RecoilRoot>
        <Home />
      </RecoilRoot>
    )

    expect(container).toMatchSnapshot()
  })
})
