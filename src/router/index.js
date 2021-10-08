import { createRouter, createWebHistory } from 'vue-router'
// import { createRouter } from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SearchView from '../views/SearchView.vue'
import UploadView from '../views/UploadView.vue'
import { Auth } from 'aws-amplify'
import { env } from 'process'

const routes = [
  {
    path: '/',
    name: 'Search',
    component: SearchView
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/upload',
    name: 'Upload',
    component: UploadView
  }
]

const router = createRouter({
  history: createWebHistory(env.BASE_URL),
  // history: createWebHistory(process.env.BASE_URL),
  routes
})

// const isAuthenticated = () => Auth.currentUserCredentials() != null

async function ionViewCanEnter() {
  try {
      const x = await Auth.currentUserInfo()
      // const x = await Auth.currentAuthenticatedUser();
      console.log('USR:', x)
      return x != null;
  } catch {
      return false;
  }
}

router.beforeEach(async (to, from, next) => {
  console.log(`Navigating ${from.name} -> ${to.name}`)
  // Auth.currentUserCredentials().then(x => {console.log('creds:', x)}).catch(() => console.log("NOT AUTH"))
  // console.log('creds', Auth.currentUserCredentials())
  if (to.name !== 'Login' && !(await ionViewCanEnter())) {
    console.log('User is NOT authenticatedXX')
    next({ name: 'Login' })
  } else {
    if (await ionViewCanEnter()) {
      console.log('XXUser is authenticated')
    }
    next()
  }
})

export default router
