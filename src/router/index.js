// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue'; // Example component
import Ms from '../views/malay.vue';


const routes = [
	{
		path: '/',
		name: 'Home',
		component: Home
	},
	{
		path: '/ms',
		name: 'Ms',
		component: Ms
	}

	// Add more routes as needed
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
