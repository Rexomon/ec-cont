import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginPage from "../views/LoginPage.vue";
import Register from "../views/Register.vue";
import Contacts from "../views/Contacts.vue";
import UpdateContacts from "../views/UpdateContacts.vue";
import CreateItems from "../views/CreateItems.vue";
import Profile from "../views/Profile.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView,
		},
		{
			path: "/login",
			name: "login",
			component: LoginPage,
		},
		{
			path: "/register",
			name: "register",
			component: Register,
		},
		{
			path: "/contacts",
			name: "contacts",
			component: Contacts,
		},
		{
			path: "/update-contacts",
			name: "update-contacts",
			component: UpdateContacts,
		},
		{
			path: "/create-items",
			name: "create-items",
			component: CreateItems,
		},
		{
			path: "/profile",
			name: "profile",
			component: Profile,
		},
	],
});

export default router;
