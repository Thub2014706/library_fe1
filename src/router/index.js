import { createWebHistory, createRouter } from "vue-router";
// import Login from "@/views/pages/login.vue";
import Admin from "@/views/admin/admin.vue";

const routes = [
    {
        path: "/admin",
        component: Admin,
        children: [
            {
                path: "publisher",
                name: "admin.publisher",
                component: () => import("@/views/admin/components/publisher.vue")
            },
            {
                path: "book",
                name: "admin.book",
                component: () => import("@/views/admin/components/books.vue")
            },
            {
                path: "reader",
                name: "admin.reader",
                component: () => import("@/views/admin/components/reader.vue")
            },
            {
                path: "borrow",
                name: "admin.borrow",
                component: () => import("@/views/admin/components/borrow.vue")
            }
        ]
    },
];
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});
export default router;