export default ({ next, store }) => {
  if (store.$jwt.getToken()) {
    next("/");
  }

  next();
};
