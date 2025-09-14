import JwtService from "@/services/jwt.service";
import axios from "@/plugins/axios";
import BaseApiService from "@/services/api/base.api.service";

export default class AuthApiService extends BaseApiService {
  constructor(notifier) {
    super(notifier);
  }

  /**
   * Set token
   */
  setAuthHeader() {
    const token = JwtService.getToken();
    axios.defaults.headers.common["Authorization"] = token
      ? `Bearer ${token}`
      : "";
  }

  /**
   * Login to server
   * @param params
   * @return {Promise<any>}
   */
  async login(params) {
    const { data } = await axios.post("login", params);
    return data;
  }

  /**
   * Logout in server
   * @return {Promise<any>}
   */
  async logout() {
    const { data } = await axios.delete("logout");
    return data;
  }

  /**
   * Information me
   * @return {Promise<any>}
   */
  async getMe() {
    const { data } = await axios.get("whoAmI");
    return data;
  }
}
