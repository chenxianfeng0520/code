import api from "@/api/index.js";

export function lottery(params) {
  return api({
    url: "/api/lottery",
    method: "get",
    params,
  });
}
