export const config = { runtime: "edge" };

export default async function handler(req) {
  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    const [scheme, encoded] = authHeader.split(" ");
    if (scheme === "Basic" && encoded) {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(":");

      if (user === "OGX-WB" && pass === "WB26") {
        const url = new URL("/_static/index.html", req.url);
        const res = await fetch(url);
        return new Response(res.body, {
          status: 200,
          headers: { "Content-Type": "text/html; charset=utf-8" },
        });
      }
    }
  }

  return new Response("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="WhichBingo Voice Guide"',
    },
  });
}
