export const validateBugInput = ({ title }) => {
  if (!title || title.trim().length < 3) {
    return "Title must be at least 3 characters";
  }
  return "";
};