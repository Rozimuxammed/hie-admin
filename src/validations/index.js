export const validation = (obj) => {
  if (obj.email === "" || obj.email.length === 0) {
    return {
      target: "email",
      message: "Enter your email",
    };
  }
  if (obj.password === "" || obj.password.length === 0) {
    return {
      target: "password",
      message: "Enter your password",
    };
  }
};
