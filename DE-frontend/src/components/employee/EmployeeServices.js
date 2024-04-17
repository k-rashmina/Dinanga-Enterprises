import axios from 'axios';

const BASE_URL = 'http://localhost:4000/employee/';

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

  login: async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { username, password });
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

};

export default EmployeeApiService;
