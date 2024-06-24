import Sorter from "@/app/sorter/page"
import { render } from "@testing-library/react"
import { RecoilRoot } from "recoil"

describe("Sorter page", () => {
  test("Renders sorter page correctly", () => {
    const { container } = render(
      <RecoilRoot>
        <Sorter />
      </RecoilRoot>
    )

    expect(container).toMatchSnapshot()
  })
})
