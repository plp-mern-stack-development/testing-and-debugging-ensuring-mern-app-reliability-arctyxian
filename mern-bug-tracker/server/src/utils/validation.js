const validateBugPayload = (payload) => {
  const errors = [];
  if (!payload || typeof payload !== "object") {
    return { isValid: false, errors: ["Invalid payload"] };
  }

  if (!payload.title || payload.title.trim().length < 3) {
    errors.push("Title must be at least 3 characters");
  }

  if (payload.status && !["open", "in-progress", "resolved"].includes(payload.status)) {
    errors.push("Status is invalid");
  }

  return { isValid: errors.length === 0, errors };
};

module.exports = { validateBugPayload };