import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BugForm from "../../components/BugForm.jsx";

const setup = () => {
  const onCreate = jest.fn().mockResolvedValue({});
  render(<BugForm onCreate={onCreate} />);
  return { onCreate };
};

describe("BugForm", () => {
  test("shows validation error for short title", async () => {
    const user = userEvent.setup();
    setup();

    await user.type(screen.getByPlaceholderText(/describe the issue/i), "Hi");
    await user.click(screen.getByRole("button", { name: /submit bug/i }));

    expect(screen.getByText(/title must be at least 3 characters/i)).toBeInTheDocument();
  });

  test("submits valid data", async () => {
    const user = userEvent.setup();
    const { onCreate } = setup();

    await user.type(screen.getByPlaceholderText(/describe the issue/i), "Login error");
    await user.type(screen.getByPlaceholderText(/steps to reproduce/i), "Click login" );
    await user.click(screen.getByRole("button", { name: /submit bug/i }));

    expect(onCreate).toHaveBeenCalledWith({
      title: "Login error",
      description: "Click login"
    });
  });
});