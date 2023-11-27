import { defineStore } from "pinia"
import { ref } from "vue"
import { useTokenStore } from "./token"

export const useUserStore = defineStore("users", () => {
  const user = ref({
    name: '',
    email: '',
    birthday: '',
    gender: '',
  })

  const isLoggedIn = function () {
    const tokenStore = useTokenStore()
    return ref(tokenStore.token);
  }
  return { user, isLoggedIn };
})