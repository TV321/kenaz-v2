import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
	{
    	path: '/',
		component: Home,
		name: 'Home'
  	},
	{
    	path: '/category/:name/',
		props: true,
		name: 'Category',
    	component: () => import(/* webpackChunkName: "category" */ '../views/Category.vue')
	},
	{
		path: '/single/',
		props: true,
		name: 'Single',
		component: () => import(/* webpackChunkName: "single" */ '../views/Single.vue')
	}
]

const router = new VueRouter({
  	mode: 'history',
  	base: process.env.BASE_URL,
  	routes
})

export default router
