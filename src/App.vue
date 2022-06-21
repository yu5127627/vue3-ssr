<template>
  <router-view v-slot="{ Component }">
    <Suspense>
      <div>
        <component :is="Component" />
      </div>
    </Suspense>
  </router-view>
</template>

<style>
* {
  margin: 0;
  padding: 0;

}
</style>