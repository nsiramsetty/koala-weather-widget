import Vue from "vue";
import Router from "vue-router";
import publicRoutes from "./public";

Vue.use(Router);

const router = new Router({
    mode : "history",
    routes: [
        ...publicRoutes
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition;
        } else {
            return {x: 0, y: 0};
        }
    }
});

export default router;
