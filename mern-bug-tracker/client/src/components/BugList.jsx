import BugItem from "./BugItem.jsx";

const BugList = ({ bugs, onUpdate, onDelete }) => {
  if (!bugs.length) {
    return <p className="status">No bugs reported yet.</p>;
  }

  return (
    <div className="bug-list">
      <h2>Reported Bugs</h2>
      <div className="bug-list__items">
        {bugs.map((bug) => (
          <BugItem key={bug._id} bug={bug} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default BugList;