import { defineStore } from "pinia"
import { ref } from "vue"
import { useTokenStore } from "./token"
import { getJwtToken } from "../apis/auth"
import axios from "axios"
export const useUserStore = defineStore("users", () => {
  const user = ref({
    name: '',
  })

  const loggedInState = ref(false)

  const isLoggedIn = async function () {
    const localStorageToken = getJwtToken();
    if (!localStorageToken) {
      console.log('=====no localstorage========')
      console.log(false)
      console.log('=====no localstorage========')
      loggedInState.value = false;
      return loggedInState.value
    }
    if (!useTokenStore().token) {
      console.log('tokenStore 空，authToken')
      const [result] = await useTokenStore().authToken(localStorageToken)
      console.log('=====空，authToken========')
      console.log(result)
      console.log('=====空，authToken========')
      loggedInState.value = result
      return loggedInState.value
    }

    if (getJwtToken() === useTokenStore().token) {
      loggedInState.value = true

      console.log('=====Equal========')
      console.log(true)
      console.log('=====Equal========')
      return loggedInState.value
    }

    console.log('=====final========')
    console.log(false)
    console.log('=====final========')
    loggedInState.value = false
    return loggedInState.value
  }


  return { user, isLoggedIn, loggedInState };
})