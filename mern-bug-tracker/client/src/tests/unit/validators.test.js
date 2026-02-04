import { validateBugInput } from "../../utils/validators.js";

describe("validateBugInput", () => {
  test("returns message when invalid", () => {
    expect(validateBugInput({ title: "Hi" })).toMatch(/at least 3/i);
  });

  test("returns empty string when valid", () => {
    expect(validateBugInput({ title: "Valid title" })).toBe("");
  });
});