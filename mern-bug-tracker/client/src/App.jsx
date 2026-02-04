import { useEffect, useState } from "react";
import BugForm from "./components/BugForm.jsx";
import BugList from "./components/BugList.jsx";
import { createBug, deleteBug, fetchBugs, updateBug } from "./services/bugApi.js";

const App = () => {
  const [bugs, setBugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadBugs = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchBugs();
      setBugs(data);
    } catch (err) {
      setError(err.message || "Failed to load bugs");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBugs();
  }, []);

  const handleCreate = async (payload) => {
    const newBug = await createBug(payload);
    setBugs((prev) => [newBug, ...prev]);
  };

  const handleUpdate = async (id, updates) => {
    const updatedBug = await updateBug(id, updates);
    setBugs((prev) => prev.map((bug) => (bug._id === id ? updatedBug : bug)));
  };

  const handleDelete = async (id) => {
    await deleteBug(id);
    setBugs((prev) => prev.filter((bug) => bug._id !== id));
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>MERN Bug Tracker</h1>
        <p>Track, update, and resolve issues with confidence.</p>
      </header>

      <section className="card">
        <BugForm onCreate={handleCreate} />
      </section>

      <section className="card">
        {loading ? (
          <p className="status">Loading bugs...</p>
        ) : error ? (
          <p className="status status--error">{error}</p>
        ) : (
          <BugList bugs={bugs} onUpdate={handleUpdate} onDelete={handleDelete} />
        )}
      </section>
    </div>
  );
};

export default App;