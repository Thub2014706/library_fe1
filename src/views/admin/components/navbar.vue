<template>
  <router-link :to="{name: 'admin.reader'}" class="text-decoration-none">
    <div class="p-2 menu rounded shadow">
        <h6 class="text-dark">Quản lý độc giả</h6>
      </div>
  </router-link>
  <router-link :to="{name: 'admin.publisher'}" class="text-decoration-none">
    <div class="p-2 mt-2 menu rounded shadow">
        <h6 class="text-dark">Quản lý nhà xuất bản</h6>
      </div>
  </router-link>
  <router-link :to="{name: 'admin.book'}" class="text-decoration-none">
    <div class="p-2 mt-2 menu rounded shadow">
      <h6 class="text-dark">Quản lý sách</h6>
    </div>
  </router-link>
  <router-link :to="{name: 'admin.borrow'}" class="text-decoration-none">
    <div class="p-2 mt-2 menu rounded shadow">
      <h6 class="text-dark">Quản lý mượn sách</h6>
    </div>
  </router-link>
</template>

<script>
export default {

}
</script>

<style>
    .menu {
        background-color: rgb(254, 242, 228);
    }
</style>