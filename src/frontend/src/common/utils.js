const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const CollectionCrud = {
  /**
   * @param {Array} collection
   * @param {Object} item
   * @returns {Object}
   */
  add(collection, item) {
    return collection.splice(collection.length, 0, item);
  },
  /**
   * @param {Array} collection
   * @param {Number|String} id
   * @param {Object} props
   * @returns {Number}
   */
  update(collection, id, props) {
    return collection.findIndex((item) => {
      if (item.id === id) {
        for (const [key, value] of Object.entries(props)) {
          item[key] = value;
        }
      }
    });
  },
  /**
   * @param {Array} collection
   * @param {Number|String} id
   * @returns {*[]}
   */
  delete(collection, id) {
    const index = collection.findIndex((item) => item.id === id);

    if (index >= 0) {
      return collection.splice(index, 1);
    }
  },
  clear(collection) {
    collection.splice(0, collection.length);
  },
  select(collection, id, prop) {
    return collection.forEach((item) => (item[prop] = item.id === id));
  },
};

export { capitalize, CollectionCrud };
