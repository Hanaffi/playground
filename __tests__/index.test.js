import Page from "../app/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

beforeEach(() => {
  render(<Page />);
});


describe("Tip Calculator", () => {
  it("renders the logo", () => {

    expect(screen.getByTestId("logo")).toBeInTheDocument();
  });

  it("shows error when people count is zero", () => {
    fireEvent.change(screen.getByTestId("people-input"), {
      target: { value: 0 }
    })

    expect(screen.getByText("Can't be zero")).toBeInTheDocument();
  });

  it("shows the correct tip value per person", () => {
    fireEvent.change(screen.getByTestId("bill-input"), {
      target: { value: 100 }
    })

    fireEvent.change(screen.getByTestId("custom-tip-input"), {
      target: { value: 10 }
    })

    expect(screen.getByTestId("total-amount-value")).toHaveTextContent("$110.00");
    expect(screen.getByTestId("tip-amount-value")).toHaveTextContent("$10.00");
  })

});