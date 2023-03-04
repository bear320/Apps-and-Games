import { createRouter, createWebHistory } from "vue-router";

const routes = [
    {
        path: "/",
        name: "home",
        component: () => import("@/views/Home.vue"),
        meta: { title: "首頁 | Omnipotent" },
    },
    {
        path: "/passwordGenerator",
        name: "passwordGenerator",
        component: () => import("@/views/PasswordGenerator.vue"),
        meta: { title: "密碼產生器 | Omnipotent" },
    },
];

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    next();
});

export default router;
