import AuthService from "../services/Auth.js";
import ErrorsUtils from "../utils/Errors.js";
import { COOKIE_SETTINGS } from "../constants.js";

class AuthController {
  static async signIn(req, res) {
    const { fingerprint } = req;
    const { userName, password } = req.body;

    try {
      const { accessToken, refreshToken, accessTokenExpiration } = await AuthService.signIn({ userName, password, fingerprint })

      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

      return res.status(200).json({ accessToken, accessTokenExpiration });
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async signUp(req, res) {
    const { fingerprint } = req;
    const { userName, password, role } = req.body;

    try {
      const { accessToken, refreshToken, accessTokenExpiration } = await AuthService.signUp({ userName, password, fingerprint, role })

      res.cookie("refreshToken", refreshToken, COOKIE_SETTINGS.REFRESH_TOKEN)

      return res.status(200).json({ accessToken, accessTokenExpiration });
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async logOut(req, res) {
    const refreshToken = req.cookies.refreshToken;
    try {
      await AuthService.logOut(refreshToken)
      res.clearCookie("refreshToken")
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }

  static async refresh(req, res) {
    const { fingerprint } = req;
    const currentRefreshToken = req.cookies.refreshToken;
    try {
      await AuthService.refresh(fingerprint, currentRefreshToken)
      return res.sendStatus(200);
    } catch (err) {
      return ErrorsUtils.catchError(res, err);
    }
  }
}

export default AuthController;
