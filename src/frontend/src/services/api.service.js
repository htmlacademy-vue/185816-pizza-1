import axios from "@/plugins/axios";
import JwtService from "@/services/jwt.service";

export default class BaseApiService {
  constructor(notifier) {
    if (!axios.$notifier) {
      axios.$notifier = notifier;
    }
  }
}

export class AuthApiService extends BaseApiService {
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

export class ReadOnlyApiService extends BaseApiService {
  #resource;

  constructor(resource, notifier) {
    super(notifier);
    this.#resource = resource;
  }

  /**
   * Get raw query request
   * @param {object} config
   * @return {Promise<any>}
   */
  async query(config = {}) {
    const { data } = await axios.get(this.#resource, config);
    return data;
  }

  /**
   * Get entity by ID
   * @param {number} id
   * @param {object} config
   * @return {Promise<any>}
   */
  async get(id, config = {}) {
    const { data } = await axios.get(`${this.#resource}/${id}`, config);
    return data;
  }
}

export class CrudApiService extends ReadOnlyApiService {
  #resource;

  /**
   * @param {string} resource
   * @param {object} notifier
   */
  constructor(resource, notifier) {
    super(resource, notifier);
    this.#resource = resource;
  }

  /**
   * Create entity
   * @param {string} entity
   * @return {Promise<any>}
   */
  async post(entity) {
    const { data } = await axios.post(this.#resource, entity);
    return data;
  }

  /**
   * Update entity
   * @param {string} entity
   * @return {Promise<any>}
   */
  async put(entity) {
    const { data } = await axios.put(`${this.#resource}/${entity.id}`, entity);
    return data;
  }

  /**
   * Delete entity
   * @param {number} id
   * @return {Promise<any>}
   */
  async delete(id) {
    const { data } = await axios.delete(`${this.#resource}/${id}`);
    return data;
  }
}
