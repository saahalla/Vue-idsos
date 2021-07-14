import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import Dashboard from '../views/Dashboard.vue'
import Project from '../views/Project.vue'
import Profile from '../views/Profile.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Users from '../views/Users.vue'
import Posts from '../views/Posts.vue'
import Follow from '../views/Follow.vue'
/* example */
import Modal from '../views/example/Modal.vue'
import Card from '../views/example/Card.vue'
import MyProfile from '../views/example/MyProfile.vue'
import MyPosts from '../views/example/MyPosts.vue'
import AddPost from '../views/example/AddPost.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: MyPosts
  },
  {
    path: '/dashboard/users',
    name: 'Users',
    component: Users
  },
  {
    path: '/dashboard/posts',
    name: 'Posts',
    component: Posts
  },
  {
    path: '/dashboard/follow',
    name: 'Follow',
    component: Follow
  },
  {
    path: '/projects',
    name: 'Project',
    component: Project
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/frontend/modal',
    name: 'Modal',
    component: Modal
  },
  {
    path: '/frontend/card',
    name: 'Card',
    component: Card
  },
  {
    path: '/frontend/myProfile',
    name: 'MyProfile',
    component: MyProfile
  },
  {
    path: '/frontend/myPosts',
    name: 'MyPosts',
    component: MyPosts
  },
  {
    path: '/frontend/addPost',
    name: 'AddPost',
    component: AddPost
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

const token = localStorage.getItem('token')
const isAuthenticated = (token !== null && token !== '' && token !== undefined) ? true : false
router.beforeEach((to, from, next) => {
  if ((to.name !== 'Login' && to.name !== 'Register') && !isAuthenticated) next({ name: 'Login' })
  // else if ((to.name === 'Login' || to.name === 'Register') && isAuthenticated) next({ name: 'Dashboard' })
  else next()
})

export default router
