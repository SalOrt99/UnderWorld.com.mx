// databaseOperations.js
import { pool } from './database-config';

export const dbOperations = {
  // User operations
  async createUser(userData) {
    const { username, email, password_hash, role_id = 2, status_id = 1 } = userData;
    
    try {
      const [result] = await pool.execute(
        'INSERT INTO users (username, email, password_hash, role_id, status_id) VALUES (?, ?, ?, ?, ?)',
        [username, email, password_hash, role_id, status_id]
      );
      
      return result.insertId;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  },

  async createUserProfile(profileData) {
    const { 
      user_id, 
      first_name, 
      apellido_paterno, 
      apellido_materno, 
      profile_photo_url, 
      phone_number 
    } = profileData;

    try {
      const [result] = await pool.execute(
        `INSERT INTO user_profiles 
         (user_id, first_name, apellido_paterno, apellido_materno, profile_photo_url, phone_number) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user_id, first_name, apellido_paterno, apellido_materno, profile_photo_url, phone_number]
      );
      
      return result.insertId;
    } catch (error) {
      console.error('Error creating user profile:', error);
      throw error;
    }
  },

  async getUserById(userId) {
    try {
      const [rows] = await pool.execute(
        `SELECT u.*, up.*, r.role_name 
         FROM users u 
         LEFT JOIN user_profiles up ON u.user_id = up.user_id 
         LEFT JOIN roles r ON u.role_id = r.role_id 
         WHERE u.user_id = ?`,
        [userId]
      );
      
      return rows[0];
    } catch (error) {
      console.error('Error getting user:', error);
      throw error;
    }
  },

  async updateUserProfile(userId, profileData) {
    const {
      first_name,
      apellido_paterno,
      apellido_materno,
      profile_photo_url,
      phone_number
    } = profileData;

    try {
      const [result] = await pool.execute(
        `UPDATE user_profiles 
         SET first_name = ?, 
             apellido_paterno = ?, 
             apellido_materno = ?, 
             profile_photo_url = ?, 
             phone_number = ? 
         WHERE user_id = ?`,
        [first_name, apellido_paterno, apellido_materno, profile_photo_url, phone_number, userId]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  },

  async deleteUser(userId) {
    try {
      // First delete the profile due to foreign key constraint
      await pool.execute('DELETE FROM user_profiles WHERE user_id = ?', [userId]);
      // Then delete the user
      const [result] = await pool.execute('DELETE FROM users WHERE user_id = ?', [userId]);
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting user:', error);
      throw error;
    }
  }
};
