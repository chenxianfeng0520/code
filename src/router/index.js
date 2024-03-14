import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  { path: "/page", component: () => import("@/views/index.vue") },
  { path: "/lottery", component: () => import("@/views/Lottery.vue") },
  { path: "/Dockerfile", component: () => import("@/views/Dockerfile.vue") },
  { path: "/", redirect: "/page" },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
