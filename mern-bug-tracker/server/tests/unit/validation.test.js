const { validateBugPayload } = require("../../src/utils/validation");

describe("validateBugPayload", () => {
  test("rejects empty payload", () => {
    const result = validateBugPayload(null);
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Invalid payload");
  });

  test("requires a title of at least 3 characters", () => {
    const result = validateBugPayload({ title: "Hi" });
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Title must be at least 3 characters");
  });

  test("accepts a valid payload", () => {
    const result = validateBugPayload({ title: "Login bug", status: "open" });
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });
});