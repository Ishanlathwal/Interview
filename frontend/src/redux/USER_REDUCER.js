////////
import axiosInstance from "../../baseUrl";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case "login/request":
    case "signup/request":
    case "loadUser/request":
      return {
        loading: true,
        isAuthenticated: false,
      };
    case "login/success":
    case "signup/success":
    case "loadUser/success":
      return {
        ...state,
        loading: false,
        isAuthenticated: true,

        user: action.payload,
      };
    case "logout/success":
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
      };
    case "login/fail":
    case "signup/fail":
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case "logout/fail":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case "loadUser/fail":
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case "clear/error":
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "login/request" });

    const config = {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axiosInstance.post(
      `/login`,
      { email, password },
      config
    );

    dispatch({ type: "login/success", payload: data.user });
  } catch (error) {
    console.log(error.response.data.message);
    dispatch({ type: "login/fail", payload: error.response.data.message });
  }
};

export const clearError = () => async (dispatch) => {
  dispatch({ type: "clear/error" });
};

/////////////////////////Sign up

export const signUp = (userData) => async (dispatch) => {
  console.log("userdata", userData);
  try {
    dispatch({ type: "signup/request" });

    const config = {
      withCredentials: true,
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axiosInstance.post(`/signup`, userData, config);

    dispatch({ type: "signup/success", payload: data.user });
  } catch (error) {
    console.log("error: ", error);

    dispatch({ type: "signup/fail", payload: error.response.data.message });
  }
};

// Load User in begning

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "loadUser/request" });
    const config = {
      withCredentials: true,
    };

    const { data } = await axiosInstance.get("/me", config);

    dispatch({ type: "loadUser/success", payload: data.user });
  } catch (error) {
    console.log("first", error.response?.data?.message);
    dispatch({ type: "loadUser/fail", payload: error.response?.data?.message });
    dispatch({ type: "clear/error" });
  }
};

//// Log out user

export const logOut = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    await axiosInstance.post(`/logout`, null, config);

    dispatch({ type: "logout/success" });
  } catch (error) {
    console.log("error: ", error);
    dispatch({ type: "logout/fail", payload: error.response.data.message });
  }
};
