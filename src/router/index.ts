import { createRouter, createWebHashHistory } from "vue-router";
import Main from "../views/Main.vue";
import FirstPage from "../views/FirstPage/FirstPage.vue";
export default createRouter({
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main,

      children: [
        {
          path: "/",
          name: "First",
          component: FirstPage,
        },
        {
          path: "/file-type",
          name: "FileType",
          component: () => import("../views/FileSystem/FileType.vue"),
        },
        {
          path: "/section",
          name: "Section",
          component: () => import("../views/BBSSystem/Section.vue"),
        },
        {
          path: "/postList",
          name: "PostList",
          component: () =>
            import(
              /* webpackChunkName:"PostList" */ "../views/BBSSystem/PostList.vue"
            ),
        },
      ],
    },
  ],
  history: createWebHashHistory(),
});
