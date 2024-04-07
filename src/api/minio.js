import api from "@/api/index.js";

export function getFileByName(params) {
  return api({
    url: "/minio/getFileByName",
    method: "get",
    params,
    // responseType: "blob",
  });
}

export function getList() {
  return api({
    url: "/minio/getList",
    method: "get",
  });
}

export function deleteFileByName(params) {
  return api({
    url: "/minio/removeObject",
    method: "get",
    params
  });
}
