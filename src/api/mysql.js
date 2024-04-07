import api from "@/api/index.js";

export function addBlog(data) {
  return api({
    url: "/mysql/addBlog",
    method: "post",
    data,
  });
}

export function updateBlog(data) {
  return api({
    url: "/mysql/updateBlog",
    method: "post",
    data,
  });
}

