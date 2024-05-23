<script setup>
import CardList from '../components/CardList.vue'
import axios from 'axios'
import { inject, reactive, watch, ref, onMounted } from 'vue'

const { cart, addToCart, removeFromCart } = inject('cart')

const items = ref([]) //хранит все корма, ref используется, чтобы хранить массив (и не только)

const filters = reactive({
  //хранит фильтры, по-рекомендации документации Vue, храним в reactive
  sortBy: 'title',
  searchQuery: ''
})

const clickAddPlus = (item) => {
  if (!item.add) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

const onChangeSelect = (event) => {
  //функции которые следят за изменением селекта и инпута
  filters.sortBy = event.target.value
}

const onChangeSearchInput = (event) => {
  filters.searchQuery = event.target.value
}

const fetchItems = async () => {
  //функция, которая будет при каждом изменении фильтров(селет и инпут) или при первом рендере будет обращаться к бекенду
  try {
    const params = {
      //при каждом рендере всегда передается сортировка, а поиск если изменился фильтр
      sortBy: filters.sortBy
    }

    if (filters.searchQuery) {
      params.title = `*${filters.searchQuery}*`
    }

    const { data } = await axios.get(`https://602464477df6fa77.mokky.dev/items`, { params })
    items.value = data.map((obj) => ({
      ...obj,
      add: false
    })) //передает данные в ref
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {
  const localCart = localStorage.getItem('cart')
  cart.value = localCart ? JSON.parse(localCart) : []

  await fetchItems()
  //await fetchWalk()

  items.value = items.value.map((item) => ({
    ...item,
    add: cart.value.some((cartItem) => cartItem === item.id)
  }))
})

watch(cart, () => {
  items.value = items.value.map((item) => ({
    ...item,
    add: false
  }))
})

watch(filters, fetchItems)
</script>

<template>
  <div class="flex justify-between items-center">
    <h2 class="text-3xl font-bold mb-8">Корма</h2>

    <div class="flex gap-4">
      <select @change="onChangeSelect" class="py-2 px-3 border rounded-md outline-none bg-white">
        <option value="title">По названию</option>
        <option value="-price">По убыванию</option>
        <option value="+price">По возрастанию</option>
      </select>

      <div class="relative">
        <img class="absolute left-3 top-2" src="/search.svg" />
        <input
          @input="onChangeSearchInput"
          class="border rounded-md py-1 pl-10 pr-4 outline-none focus:border-gray-400"
          type="text"
          placeholder="Поиск..."
        />
      </div>
    </div>
  </div>
  <div class="mt-10">
    <CardList :items="items" @add-to-cart="clickAddPlus" />
  </div>
</template>
