export function getAuthToken() {
  // Retrieve the token from local storage
  const token = localStorage.getItem("authToken");

  // Return the token if it exists, otherwise return null
  return token || null;
}
