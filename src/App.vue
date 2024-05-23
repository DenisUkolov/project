<script setup>
import { ref, watch, provide, computed } from 'vue'
import axios from 'axios'

import Header from './components/Header.vue'
import Drawer from './components/Drawer.vue'

/* Корзина */
const cart = ref([])

const drawerOpen = ref(false)

const totalPrice = computed(() => cart.value.reduce((acc, item) => acc + item.price, 0))

const closeDrawer = () => {
  drawerOpen.value = false
}

const openDrawer = () => {
  drawerOpen.value = true
}

const addToCart = (item) => {
  cart.value.push(item)
  item.add = true
}

const removeFromCart = (item) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.add = false
}

watch(
  cart,
  () => {
    localStorage.setItem('cart', JSON.stringify(cart.value))
  },
  { deep: true }
)

provide('cart', {
  cart,
  closeDrawer,
  openDrawer,
  addToCart,
  removeFromCart
})

/* Корзина */

//const fetchWalk = async () => {
//функция, которая будет при каждом изменении фильтров(селет и инпут) или при первом рендере будет обращаться к бекенду
//try {
//const params = {
//при каждом рендере всегда передается сортировка, а поиск если изменился фильтр
//sortBy: filters.sortBy
//}

//if (filters.searchQuery) {
//params.title = `*${filters.searchQuery}*`
//}

//const { data } = await axios.get(`https://602464477df6fa77.mokky.dev/walk`, { params })
//walk.value = data //передает данные в ref
//} catch (error) {
//console.log(error)
//}
//}
</script>

<template>
  <Drawer v-if="drawerOpen" :total-price="totalPrice" />
  <div class="bg-white w-4/5 m-auto rounded-xl shadow-xl mt-14">
    <Header :total-price="totalPrice" @open-drawer="openDrawer" />

    <div class="p-10">
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped></style>
