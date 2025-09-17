import { setAuth } from "@/common/heplers";

export default ({ next, store }) => {
  if (!store.state.Auth.isAuthenticated) {
    const token = store.$jwt.getToken();
    if (token) {
      setAuth(store);
    } else {
      next("/login");
    }
  }

  return next();
};
