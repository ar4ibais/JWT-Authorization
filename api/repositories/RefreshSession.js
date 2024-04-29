import pool from "../db.js";

class RefreshSessionRepository {
  static async getRefreshSession(refreshToken) { }

  static async createRefreshSession({ id, refreshToken, fingerprint }) {
    await pool.query("INSERT INTO refresh_sessions (user_id, refresh_token, finger_print) VALUES ($1, $2, $3)", [id, refreshToken, fingerprint.hash])
  }

  static async deleteRefreshSession(refreshToken) { }
}

export default RefreshSessionRepository;
