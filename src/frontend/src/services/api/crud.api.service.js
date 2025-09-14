import axios from "@/plugins/axios";
import ReadOnlyApiService from "@/services/api/read-only.api.service";

export default class CrudApiService extends ReadOnlyApiService {
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
