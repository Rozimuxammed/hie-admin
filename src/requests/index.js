const bestUrl = import.meta.env.VITE_API_KEY;

export const login = async (obj) => {
  const req = await fetch(`${bestUrl}/authorization/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(obj),
  });
  if (req.status === 200) {
    const res = await req.json();
    return res;
  } else {
    throw new Error("Login failed");
  }
};
