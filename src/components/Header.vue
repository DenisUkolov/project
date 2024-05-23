<script setup>
defineProps({
  totalPrice: Number
})

const emit = defineEmits(['openDrawer'])
</script>

<template>
  <header class="flex justify-between border-b border-slate-300 px-8 py-4">
    <router-link to="/"
      ><div class="flex items-center gap-4">
        <img src="/logo.png" alt="Logo" class="w-12" />
        <div>
          <h2 class="text-xl font-bold uppercase">My Dogs</h2>
          <p class="text-slate-400">Товары для собак</p>
        </div>
      </div></router-link
    >

    <ul class="flex items-center gap-10">
      <router-link to="/"
        ><li class="flex items-center cursor-pointer gap-3 text-slate-500 hover:text-black">
          <img src="" alt="" />
          <span>Еда</span>
        </li></router-link
      >
      <router-link to="/walk"
        ><li class="flex items-center cursor-pointer gap-3 text-slate-500 hover:text-black">
          <img src="" alt="" />
          <span>Прогулки</span>
        </li></router-link
      >
      <router-link to="another"
        ><li class="flex items-center cursor-pointer gap-3 text-slate-500 hover:text-black">
          <img src="" alt="" />
          <span>Остальное</span>
        </li></router-link
      >

      <li
        @click="() => emit('openDrawer')"
        class="flex items-center cursor-pointer gap-3 text-slate-500 hover:text-black"
      >
        <img src="/cart.svg" alt="Cart" />
        <b>{{ totalPrice }} руб.</b>
      </li>
      <li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
        <img src="/profile.svg" />
        <span>Профиль</span>
      </li>
    </ul>
  </header>
</template>
