<template>
  <div class="page">
    <h1>API</h1>
    <h1>我是服务端走接口的渲染页面</h1>
    <div>
      {{ yiyan.data }}
    </div>
    <br>
    <br>
    <div>
      <button @click="handleClick">点击测试</button>
      <h5 class="h5">{{ count }}</h5>
      <strong style="color: #999;">因为在某些情况下，水合异常会影响事件触发。</strong>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onServerPrefetch, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useCacheStore } from '../store/modules/cache'

export default defineComponent({
  name: 'Api',
  setup() {
    const cacheStore = useCacheStore();
    let yiyan = reactive<any>({
      data: {}
    });
    let count = ref<number>(0);

    onServerPrefetch(async () => {
      const { data } = await axios.get('https://v1.hitokoto.cn/');
      yiyan.data = data;
      cacheStore.yiyan.data = data;
    })

    onMounted(() => {
      yiyan.data = cacheStore.yiyan.data;
    })

    const handleClick = () => {
      count.value += 1;
    }

    return {
      handleClick,
      yiyan,
      count
    };
  }
});
</script>

<style lang='less' scoped>
.page {
  background-color: antiquewhite;
  padding: 20px 50px;

  .h5 {
    font-size: 50px;
    color: red;
  }
}
</style>