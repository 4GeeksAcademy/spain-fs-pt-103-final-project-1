export const initialStore = () => {
  const storedIsAdmin = localStorage.getItem("is_admin");
  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");

  return {
    message: null,
    is_admin: storedIsAdmin ? JSON.parse(storedIsAdmin) : false,
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set_hello":
      return {
        ...store,
        message: action.payload,
      };
    case "set_user":
      const { user, token } = action.payload;
      return {
        ...store,
        user,
        token,
      };
    case "Logout":
      return {
        ...store,
        user: null,
        is_admin: false,
        token: null,
      };
    case "admin":
      const { is_admin } = action.payload;
      return {
        ...store,
        is_admin: is_admin,
      };
    case "set_token":
      return {
        ...store,
        token: action.payload,
      };
    default:
      throw Error("Unknown action.");
  }
}
