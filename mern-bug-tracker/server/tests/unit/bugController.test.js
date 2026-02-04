const { createBug } = require("../../src/controllers/bugController");
const Bug = require("../../src/models/Bug");
const { validateBugPayload } = require("../../src/utils/validation");

jest.mock("../../src/models/Bug");
jest.mock("../../src/utils/validation");

const mockResponse = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("bugController createBug", () => {
  test("creates a bug when payload is valid", async () => {
    validateBugPayload.mockReturnValue({ isValid: true, errors: [] });
    Bug.create.mockResolvedValue({ _id: "1", title: "Bug title" });

    const req = { body: { title: "Bug title", description: "Details" } };
    const res = mockResponse();
    const next = jest.fn();

    await createBug(req, res, next);

    expect(Bug.create).toHaveBeenCalledWith({
      title: "Bug title",
      description: "Details",
      status: "open"
    });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ _id: "1", title: "Bug title" });
  });
});
