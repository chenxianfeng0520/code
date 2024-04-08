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


export function getBlog() {
  return api({
    url: "/mysql/getBlog",
    method: "get",
  });
}

export function getBlogById(params) {
  return api({
    url: "/mysql/getBlogById",
    method: "get",
    params
  });
}

export function deleteBlog(params) {
  return api({
    url: "/mysql/deleteBlog",
    method: "get",
    params
  });
}
