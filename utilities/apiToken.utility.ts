export const checkTokenExpired = (token:string) => {
  if (!token || token == "undefined" || token == "null") return true;
  let base64Url = token.split(".")[1];
  let base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  let jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );
  const jwt = JSON.parse(jsonPayload);
  const now = new Date();
  const exp = new Date(jwt.exp * 1000);
  return now > exp;
};
