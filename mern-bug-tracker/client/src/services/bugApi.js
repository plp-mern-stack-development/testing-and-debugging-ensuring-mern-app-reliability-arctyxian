const API_BASE = "";

const handleResponse = async (response) => {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new Error(data.message || "Request failed");
  }
  return response.json();
};

export const fetchBugs = () =>
  fetch(`${API_BASE}/api/bugs`).then(handleResponse);

export const createBug = (payload) =>
  fetch(`${API_BASE}/api/bugs`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).then(handleResponse);

export const updateBug = (id, updates) =>
  fetch(`${API_BASE}/api/bugs/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updates)
  }).then(handleResponse);

export const deleteBug = (id) =>
  fetch(`${API_BASE}/api/bugs/${id}`, {
    method: "DELETE" }
  ).then(handleResponse);