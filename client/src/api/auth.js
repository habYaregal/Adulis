import axios from "axios";
axios.defaults.withCredentials = true;

export async function onRegistration(registrationData) {
  const response= await axios.post(
    "http://localhost:3000/api/register",
    registrationData
  );
  console.log(response.user)
  if (response.data.success) {
    localStorage.setItem("user", JSON.stringify(response.data.data)); // Store user data in localStorage
  }
  return response;
}

export async function onLogin(loginData) {
  const response = await axios.post(
    "http://localhost:3000/api/login",
    loginData
  );
  if (response.data.success) {
    localStorage.setItem("user", JSON.stringify(response.data.data)); // Store user data in localStorage
  }
  return response;
}
export async function onLogout() {
  return await axios.get("http://localhost:3000/api/logout");
}

export async function onGetUsers() {
  return await axios.get("http://localhost:3000/api/users");
}

export async function fetchProtectedInfo() {
  return await axios.get("http://localhost:3000/api/protected");
}
