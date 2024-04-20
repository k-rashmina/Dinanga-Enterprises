import axios from 'axios';

const BASE_URL = 'http://localhost:5000/employee/';

const EmployeeApiService = {

    getEmployees: async () => {
    try {
      const response = await axios.get(`${BASE_URL}getAllEmployeeDetails`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error; 
    }
  },

  getAvailableMechEmployees: async () => {
    try {
      const response = await axios.get(`${BASE_URL}getAvailableMechanicalEmployees`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error; 
    }
  },


  getAvailableConsultEmployees: async () => {
    try {
      const response = await axios.get(`${BASE_URL}getAvailableConsultancyEmployees`);
      return response.data; 
    } catch (error) {
      console.error('Error fetching employees:', error);
      throw error; 
    }
  },


  // Example POST request
  registerEmployee: async (employeeData) => {
    try {
      const response = await axios.post(`${BASE_URL}registerEmployee`, employeeData);
      return response.data; 
    } catch (error) {
      console.error('Error creating employee:', error);
      throw error; 
    }
  },

  deleteEmployee: async (employeeId) => {
    try {
      const response = await axios.delete(`${BASE_URL}deleteEmployee/${employeeId}`);
      return response.data; 
    } catch (error) {
      console.error('Error deleting employee:', error);
      throw error; 
    }
  },

  updateEmployee: async (employee) => {
    try {
      const response = await axios.put(`${BASE_URL}/updateEmployee/${employee._id}`, employee);
      return response.data;
    } catch (error) {
      console.error('Error updating employee:', error);
      throw error;
    }
  },
  
  loginEmployee: async (username, password) => {
    try {
      // Define the data to be sent in the request body
      const data = {
        username,
        password
      };

      // Send a POST request to the login API endpoint
      const response = await axios.post(`${BASE_URL}login`, data);

      // Handle the response from the server
      if (response.status === 200) {
        // Successful login
        console.log('Login successful:', response.data);
        // You can handle the response data as needed, e.g., storing a token, redirecting, etc.
        return response.data;
      } else {
        // Handle other response statuses
        console.log('Login failed:', response.data);
        throw new Error('Login failed');
      }
    } catch (error) {
      // Handle errors
      if (error.response) {
        // Server responded with a status other than 2xx
        console.error('Server error:', error.response.data);
      } else if (error.request) {
        // No response was received
        console.error('Network error:', error.request);
      } else {
        // Other errors (e.g., request setup)
        console.error('Error:', error.message);
      }

      // Rethrow the error to handle it in the calling function
      throw error;
    }
  },


};

export default EmployeeApiService;
