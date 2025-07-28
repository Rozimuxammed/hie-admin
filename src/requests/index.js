const bestUrl = import.meta.env.VITE_API_KEY;

export const login = async (obj) => {
  const req = await fetch(`https://hie.pixl.uz/authorization/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });

  if (!req.ok) {
    throw new Error("Login failed");
  }

  const res = await req.json();

  const now = Date.now();
  localStorage.setItem("token", res.token);
  localStorage.setItem("token_created_at", now.toString());
  localStorage.setItem("user", JSON.stringify(res.result));

  return res.result;
};

export const PostCategory = async (obj) => {
  const req = await fetch(`https://hie.pixl.uz/category`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(obj),
  });

  if (!req.ok) {
    throw new Error("Login failed");
  }
  const res = await req.json();
  localStorage.setItem("categori", JSON.stringify(res));
  return res;
};
