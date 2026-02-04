import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../App.jsx";

const mockBug = {
  _id: "1",
  title: "Navbar glitch",
  description: "Dropdown flickers",
  status: "open"
};

describe("App integration", () => {
  beforeEach(() => {
    global.fetch = jest.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [mockBug]
      })
      .mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          _id: "2",
          title: "New bug",
          description: "Details",
          status: "open"
        })
      });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test("loads and creates bugs", async () => {
    render(<App />);

    expect(await screen.findByText(/navbar glitch/i)).toBeInTheDocument();

    const user = userEvent.setup();
    await user.type(screen.getByPlaceholderText(/describe the issue/i), "New bug");
    await user.type(screen.getByPlaceholderText(/steps to reproduce/i), "Details");
    await user.click(screen.getByRole("button", { name: /submit bug/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(2);
    });
  });

  test("shows error state when API fails", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "Server error" })
    });

    render(<App />);

    expect(await screen.findByText(/server error/i)).toBeInTheDocument();
  });
});
