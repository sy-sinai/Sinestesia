export const loginUser = async (credentials) => {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  });
  if (!res.ok) throw new Error('Error during login');
  return await res.json();
};

export const registerUser = async (userData) => {
  const res = await fetch('/api/auth/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userData)
  });
  if (!res.ok) throw new Error('Error during registration');
  return await res.json();
};