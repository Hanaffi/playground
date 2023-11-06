import Page from "../app/page";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Tip Calculator", () => {
    it("renders the logo", () => {
      render(<Page />);
      expect(screen.getByTestId("logo")).toBeInTheDocument();
    });

    it("renders the form", () => {
        render(<Page />);
        expect(screen.getByTestId("form")).toBeInTheDocument();
    });
    
  });