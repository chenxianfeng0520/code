import api from "@/api/index.js";

export function lottery(params) {
  return api({
    url: "/api/lottery",
    method: "get",
    params,
  });
}

export function getFileByName() {
  return api({
    url: "/minio/getFileByName",
    method: "get",
    // responseType: "blob",
  });
}

export function getList() {
  return api({
    url: "/minio/getList",
    method: "get",
  });
}

