import { defineStore } from "pinia"
import { reactive } from "vue"

export const useCacheStore = defineStore('cache', () => { 
  let yiyan = reactive({
    data: null
  })

  return {
    yiyan
  }
})