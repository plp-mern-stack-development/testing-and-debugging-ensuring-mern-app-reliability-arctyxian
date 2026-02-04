const statusOptions = ["open", "in-progress", "resolved"];

const BugItem = ({ bug, onUpdate, onDelete }) => (
  <div className="bug-item">
    <div>
      <h3>{bug.title}</h3>
      <p>{bug.description || "No details provided."}</p>
    </div>
    <div className="bug-item__actions">
      <select
        value={bug.status}
        onChange={(event) => onUpdate(bug._id, { status: event.target.value })}
      >
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <button className="btn btn--outline" onClick={() => onDelete(bug._id)}>
        Delete
      </button>
    </div>
  </div>
);

export default BugItem;