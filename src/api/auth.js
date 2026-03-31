const API_auth = "https://easydev.club/api/v1";

export const registrstionUser = async (userData) => {
  const response = await fetch(`${API_auth}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });
  if (!response.ok) {
    throw new Error(`Ошибка регистрации пользователя `);
  }
  return await response.json();
};
