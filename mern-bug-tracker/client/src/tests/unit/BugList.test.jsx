import { render, screen } from "@testing-library/react";
import BugList from "../../components/BugList.jsx";

const sampleBug = {
  _id: "1",
  title: "Crash on submit",
  description: "App crashes",
  status: "open"
};

describe("BugList", () => {
  test("renders empty state", () => {
    render(<BugList bugs={[]} onUpdate={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText(/no bugs reported yet/i)).toBeInTheDocument();
  });

  test("renders a bug item", () => {
    render(<BugList bugs={[sampleBug]} onUpdate={jest.fn()} onDelete={jest.fn()} />);
    expect(screen.getByText(/crash on submit/i)).toBeInTheDocument();
  });
});