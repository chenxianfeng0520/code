import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  { path: "/page", component: () => import("@/views/index.vue") },
  { path: "/lottery", component: () => import("@/views/Lottery.vue") },
  { path: "/lotteryOld", component: () => import("@/views/Lottery_old.vue") },
  { path: "/Dockerfile", component: () => import("@/views/DockerfilePage.vue") },
  { path: "/MonacoEditor", component: () => import("@/views/MonacoEditor.vue") },
  { path: "/Markdown", component: () => import("@/views/Markdown.vue") },
  { path: "/Minio", component: () => import("@/views/Minio.vue") },
  { path: "/", redirect: "/page" },
];
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
