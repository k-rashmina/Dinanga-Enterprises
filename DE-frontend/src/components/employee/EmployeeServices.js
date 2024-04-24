import axios from "axios";

const BASE_URL = "http://localhost:4000/employee/";

const EmployeeApiService = {
  getEmployees: async () => {
    try {
      const response = await axios.get(`${BASE_URL}getAllEmployeeDetails`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },

  getAvailableMechEmployees: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}getAvailableMechanicalEmployees`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },

  getAvailableConsultEmployees: async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}getAvailableConsultancyEmployees`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },

  // Example POST request
  registerEmployee: async (employeeData) => {
    try {
      const response = await axios.post(
        `${BASE_URL}registerEmployee`,
        employeeData
      );
      return response.data;
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  },

  deleteEmployee: async (employeeId) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}deleteEmployee/${employeeId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  },

  updateEmployee: async (employee) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/updateEmployee/${employee._id}`,
        employee
      );
      return response.data;
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  },

  loginEmployee: async (username, password) => {
    try {
      // Send a POST request to the login API endpoint
      const response = await axios.post(`${BASE_URL}login`, {
        username,
        password
      });

      // Handle the response
      if (response.status === 200) {
        // Login successful
        const { token, message } = response.data;
        console.log(message); // Optional: log the message from the server

        // Store the JWT token in local storage or session storage for future use
        localStorage.setItem("authToken", token);

        // Return the response data to be used elsewhere in your application
        return response.data;
      } else {
        // Handle unexpected response status codes
        throw new Error(`Unexpected response status code: ${response.status}`);
      }
    } catch (error) {
      // Handle errors (e.g., incorrect credentials or network issues)
      if (error.response) {
        // Server responded with a status other than 200 range
        console.error("Login failed:", error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        // Network error or other issues
        console.error("Login failed:", error);
        throw new Error(
          "An error occurred during login. Please try again later."
        );
      }
    }
  }
};

export default EmployeeApiService;
