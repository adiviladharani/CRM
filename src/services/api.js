const API_URL = "http://localhost:3002";

async function request(resource, options = {}) {
  const response = await fetch(
    `${API_URL}/${resource}`,
    {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    }
  );

  if (!response.ok) {
    throw new Error(
      `Request failed: ${response.status}`
    );
  }

  if (response.status === 204) {
    return null;
  }

  return response.json();
}

export const api = {
  get(resource) {
    return request(resource);
  },

  post(resource, data) {
    return request(resource, {
      method: "POST",
      body: JSON.stringify(data)
    });
  },

  put(resource, id, data) {
    return request(`${resource}/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    });
  },

  patch(resource, id, data) {
    return request(`${resource}/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data)
    });
  },

  delete(resource, id) {
    return request(`${resource}/${id}`, {
      method: "DELETE"
    });
  }
};