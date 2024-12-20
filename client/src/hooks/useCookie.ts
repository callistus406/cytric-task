import Cookies from "js-cookie";

const useCookie = () => {
  const setAuthToken = (
    name: string,
    token: string,
    
  ) => {
    Cookies.set(name, token, {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
  };

  const getAuthToken = () => {
    return Cookies.get("authToken");
  };
  const deleteToken = () => {
    return Cookies.remove("authToken");
  };

  return { setAuthToken, getAuthToken,deleteToken };
};

export default useCookie;
