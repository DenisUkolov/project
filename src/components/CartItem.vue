<script setup>
const emit = defineEmits(['clickRemove'])

defineProps({
  id: Number,
  title: String,
  imageUrl: String,
  price: Number
})
</script>

<template>
  <div class="flex items-center border border-slate-200 p-4 rounded-xl gap-4">
    <img class="w-16 h-16" :src="imageUrl" :alt="title" />

    <div class="flex flex-col flex-grow">
      <span>{{ title }}</span>

      <div class="flex justify-between mt-2">
        <span class="font-bold">{{ price }} руб.</span>
        <img
          @click="emit('clickRemove')"
          class="opacity-40 hover:opacity-100 cursor-pointer transition"
          src="/close.svg"
        />
      </div>
    </div>
  </div>
</template>
