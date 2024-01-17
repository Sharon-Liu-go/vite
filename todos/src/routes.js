import Header from "./pages/Header.vue"
import HomePage from "./pages/HomePage.vue"
import Todos from "./pages/Todos.vue"
import Setting from "./pages/Setting.vue"
import SignUp from "./pages/SignupPage.vue"
import SignIn from "./pages/SignInPage.vue"
import FooterExample from "./pages/FooterExample.vue"
import inspect from "./pages/Inspect.vue"




import { createRouter, createWebHistory } from "vue-router";
import { getJwtToken } from "./apis/auth"
import { useUserStore } from "./stores/users"


const routes = [
  {
    path: "/signIn",
    component: SignIn,
    name: "signIn"
  },
  {
    path: "/signUp",
    component: SignUp,
    name: "signUp"
  },
  {
    path: "/home",
    components: {
      nav: Header,
      default: HomePage,
      footer: FooterExample
    }
  },
  {
    path: "/setting",
    components: {
      nav: Header,
      default: Setting,
      footer: FooterExample
    }
  },
  {
    path: "/todos",
    components: {
      nav: Header,
      default: Todos,
      footer: FooterExample
    }
  },
  {
    path: "/inspect",
    components: {
      nav: Header,
      default: inspect,
      footer: FooterExample
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((async (to, from, next) => {
  console.log('to', to, 'from', from)
  try {
    const notNeedAuthenticated = ['signIn', 'signUp']
    const jwtToken = getJwtToken()
    if (!jwtToken && !notNeedAuthenticated.includes(to.name)) {
      next('/signIn')
      return
    }
    const userStore = useUserStore();
    const isLoggedIn = await userStore.isLoggedIn()
    console.log('to sign-in or sign up ? : ', !notNeedAuthenticated.includes(to.name))
    console.log('isLoggedIn : ', isLoggedIn)

    if (!isLoggedIn && !notNeedAuthenticated.includes(to.name)) {
      next('/signin')
      return
    }
    if (isLoggedIn && notNeedAuthenticated.includes(to.name)) {
      next('/setting');
      return
    }

    next()

  } catch (err) {
    console.log(err)
  }
}))



export default router;