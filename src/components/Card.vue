<script setup>
defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number,
  add: Boolean,
  clickAdd: Function
})
</script>

<template>
  <div
    class="relative bg-white border border-slate-100 rounded-3xl p-8 cursor-pointer hover:-translate-y-2 hover:shadow-xl transition"
  >
    <img :src="imageUrl" alt="Eat" class="w-full h-60 object-cover rounded-2xl" />
    <p class="mt-2">{{ title }}</p>

    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-600">Цена:</span>
        <b>{{ price }} руб.</b>
      </div>

      <img @click="clickAdd" :src="!add ? '/plus.svg' : '/checked.svg'" alt="Plus" />
    </div>
  </div>
</template>
