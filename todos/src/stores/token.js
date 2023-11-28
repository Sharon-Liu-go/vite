import { defineStore } from "pinia"
import { ref } from "vue"
import axios from "axios"
import { useUserStore } from "./users"

export const useTokenStore = defineStore("token", () => {
  const token = ref('')

  const authToken = async function (jwtToken) {
    const res = await axios.post('http://localhost:3000/authToken', {}, {
      headers: {
        'Content-Type': 'application/json', // 指定请求的数据格式为 JSON
        'Authorization': 'Bearer ' + jwtToken, // 添加授权信息的头部
      }
    })
    if (res.data.code === 0) {
      token.value = jwtToken
      let userStore = useUserStore()
      userStore.user.name = res.data.user.name;
      return [true, userStore]
    }
    return [false]
  }

  return { token, authToken };
})