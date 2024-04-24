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

  updateProfile: async (employeeId,employee) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/updateEmployee/${employeeId}`,
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
      const response = await axios.post(`${BASE_URL}login`, {
        username,
        password
      });

      if (response.status === 200) {

        const { token, message } = response.data;
        console.log(message); 

        localStorage.setItem("authToken", token);

        return response.data;
      } else {

        throw new Error(`Unexpected response status code: ${response.status}`);
      }
    } catch (error) {
 
      if (error.response) {
       
        console.error("Login failed:", error.response.data.message);
        throw new Error(error.response.data.message);
      } else {
        
        console.error("Login failed:", error);
        throw new Error(
          "An error occurred during login. Please try again later."
        );
      }
    }
  },

  getEmployeeDetails: async (employeeId) => {
    try {
      const response = await axios.get(`${BASE_URL}getEmployeeDetails/${employeeId}`);
      
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.error('Employee not found:', error.response.data.msg);
        throw new Error('Employee not found');
      } else {
        console.error('Server error:', error.message);
        throw new Error('Server error');
      }
    }
  },

};

export default EmployeeApiService;
