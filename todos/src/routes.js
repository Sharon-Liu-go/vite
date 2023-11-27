import HomePage from "./pages/HomePage.vue"
import Header from "./pages/Header.vue"
import Todos from "./pages/Notes.vue"
import Me from "./pages/Me.vue"
import Signup from "./pages/SignupPage.vue"
import SignIn from "./pages/SignInPage.vue"
import FooterExample from "./pages/FooterExample.vue"


import { createRouter, createWebHistory } from "vue-router";
import { getJwtToken } from "./apis/auth"
import { useTokenStore } from "./stores/token"
import { useUserStore } from "./stores/users"


const routes = [
  {
    path: "/signin",
    component: SignIn,
    name: "signin"
  },
  {
    path: "/signup",
    component: Signup
  },
  {
    path: "/home",
    components: {
      nav: Header,
      default: Me,
      footer: FooterExample
    }
  },
  {
    path: "/aboutMe",
    components: {
      nav: Header,
      default: Todos,
      footer: FooterExample
    }
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((async (to, from, next) => {
  try {
    const jwtToken = getJwtToken()
    if (!jwtToken) {
      next('/signIn')
      return
    }
    const userStore = useUserStore();
    const tokenStore = useTokenStore();

    console.log(1, !userStore.user)
    console.log(2, tokenStore.token !== jwtToken)
    console.log(3, !userStore.isLoggedIn())

    if ((!userStore.user || tokenStore.token !== jwtToken || !userStore.isLoggedIn()) && to.name === 'signin') {
      next('/signIn')
      return
    }

    if (userStore.user && tokenStore.token === jwtToken || userStore.isLoggedIn() && to.name === 'signin') {
      next('/home');
      return
    }
    next()

  } catch (err) {
    console.log(err)
  }
}))



export default router;


