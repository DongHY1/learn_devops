import { createRouter, createWebHistory } from "vue-router";
const home = () => import("../components/Home.vue");
const about = () => import("../components/About.vue");
const routes = [
  { path: "/", redirect: "/home" },
  {
    path: "/home",
    name: "home",
    component: home,
  },
  {
    path: "/about",
    name: "about",
    component: about,
  },
];
export const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});
