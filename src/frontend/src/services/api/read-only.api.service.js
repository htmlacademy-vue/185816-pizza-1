import axios from "@/plugins/axios";
import BaseApiService from "@/services/api/base.api.service";

export default class ReadOnlyApiService extends BaseApiService {
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
