export const replacePath = (str) => {
  if (typeof str !== "string") {
    return new TypeError("replacePath must be a string");
  }

  return str.replace(/\/.+\//gm, "").replace(/\..+/gm, "");
};
