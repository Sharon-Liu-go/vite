import { defineStore } from "pinia"
import { ref } from "vue"
import { useTokenStore } from "./token"
import { getJwtToken } from "../apis/auth"
import axios from "axios"

export const useUserStore = defineStore("users", () => {
  const user = ref({
    name: '',
  })

  const isLoggedIn = async function () {
    const localStorageToken = getJwtToken();
    if (!localStorageToken) {
      return false;
    }
    if (!useTokenStore().token) {
      console.log('tokenStore 空，authToken')
      const [result] = await useTokenStore().authToken(localStorageToken)
      return result
    }

    if (getJwtToken() === useTokenStore().token) {
      return true;
    }
    return false
  }


  return { user, isLoggedIn };
})