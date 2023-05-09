import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:3000/users/';

class UserService {
  async getUserById(userId) {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error al buscar usuario");
    }
  }

  async getUserByNickname(nickname) {
    try {
      const response = await axios.get(`${API_URL}/user/nickname/${nickname}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw new Error("Error al buscar usuario");
    }
    
  }

  async getUserFriends(userId) {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}/friends`, { headers: authHeader() });
      return response.data
      
    } catch (error) {
      console.error(error);
      throw new Error("Error al obtener los amigos del usuario");
    }
  }

  async getUserNonFriends(userId) {
    try {
      const response = await axios.get(`${API_URL}/user/${userId}/nonfriends`, { headers: authHeader() });
      return response.data
      
    } catch (error) {
      
    }
  }

  async checkUser(userId, nickname, email) {
    try {
      const response = await axios.get(`${API_URL}/check/${userId}`, {
        params: {
          nickname: nickname,
          email: email
        }
      });

      return response.data;
    } catch (error) {

      console.error(error);
      throw new Error("Error al comprobar el nickname y el email");
    }
  }

  async updateUser(userId, userData) {
    try {
     
      const response = await axios.patch(`${API_URL}/change-data/${userId}`, userData);

      return response.data;

    } catch (error) {

      console.error(error);
      throw new Error("Error al actualizar usuario");
    }
  }

  async deleteUser(userId) {
    try {
      
      const response = await axios.delete(`${API_URL}/delete/${userId}`);

      return response.data;
    } catch (error) {
      
      console.error(error);
      throw new Error("Error al eliminar usuario");
    }
  }

  // getUserBoard() {
  //   return axios.get(API_URL + 'user', { headers: authHeader() });
  // }

  // getModeratorBoard() {
  //   return axios.get(API_URL + 'mod', { headers: authHeader() });
  // }

  // getAdminBoard() {
  //   return axios.get(API_URL + 'admin', { headers: authHeader() });
  // }
}

const userService = new UserService();
export default userService;