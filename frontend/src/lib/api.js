const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getAllItems = async (type) => {
  const res = await fetch(`${API_URL}/${type}`);
  if (!res.ok) throw new Error(`Error fetching ${type}`);
  return await res.json();
};

export const fetchItemById = async (type, id) => {
  const res = await fetch(`${API_URL}/${type}/${id}`);
  if (!res.ok) throw new Error(`Error fetching ${type} item`);
  return await res.json();
};

export const getTopRatedItems = async (type) => {
  const res = await fetch(`${API_URL}/${type}/top`);
  if (!res.ok) throw new Error(`Error fetching top ${type}`);
  return await res.json();
};

export const createReview = async (reviewData, token) => {
  const res = await fetch(`${API_URL}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(reviewData)
  });
  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || 'Error creating review');
  }
  return await res.json();
};

export const getUserReviews = async (token) => {
  const res = await fetch(`${API_URL}/reviews/my-reviews`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!res.ok) throw new Error('Error fetching user reviews');
  return await res.json();
};