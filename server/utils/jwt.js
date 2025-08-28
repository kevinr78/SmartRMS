import jwt from 'jsonwebtoken'
import AppError from './AppError'


class JwtService {
  constructor() {
    this.accessTokenSecret = process.env.ACCESS_TOKEN_SECRET || "default_access_secret";
    this.refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET || "default_refresh_secret";
    this.accessTokenExpiry = "15m"; // Short-lived
    this.refreshTokenExpiry = "7d"; // Longer-lived
  }

  // Generate access token
  generateAccessToken(payload) {
    return jwt.sign(payload, this.accessTokenSecret, { expiresIn: this.accessTokenExpiry });
  }

  // Generate refresh token
  generateRefreshToken(payload) {
    return jwt.sign(payload, this.refreshTokenSecret, { expiresIn: this.refreshTokenExpiry });
  }

  // Verify access token
  verifyAccessToken(token) {
    try {
      return jwt.verify(token, this.accessTokenSecret);
    } catch (err) {
      throw new AppError("Error while verifying credentials")
    }
  }

  // Verify refresh token
  verifyRefreshToken(token) {
    try {
      return jwt.verify(token, this.refreshTokenSecret);
    } catch (err) {
      throw new AppError("Error while verifying credentials")
    }
  }
}
export default new JwtService();
