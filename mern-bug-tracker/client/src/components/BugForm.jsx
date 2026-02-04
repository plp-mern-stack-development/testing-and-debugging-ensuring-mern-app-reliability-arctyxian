import { useState } from "react";
import { validateBugInput } from "../utils/validators.js";

const BugForm = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = validateBugInput({ title, description });
    if (message) {
      setError(message);
      return;
    }

    setError("");
    await onCreate({ title, description });
    setTitle("");
    setDescription("");
  };

  return (
    <form className="bug-form" onSubmit={handleSubmit}>
      <h2>Report a Bug</h2>
      <label className="field">
        Title
        <input
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Describe the issue"
          required
        />
      </label>
      <label className="field">
        Details
        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Steps to reproduce, expected behavior, etc."
          rows="4"
        />
      </label>
      {error && <p className="status status--error">{error}</p>}
      <button className="btn" type="submit">Submit Bug</button>
    </form>
  );
};

export default BugForm;