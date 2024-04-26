<template>
    <div class="row">
        <div class="col-md-2 min-vh-100 colum1-color">
            <h2>Gia Thư</h2>
            <Navbar />
        </div>
        <div class="col-md-10">
            <!-- <h2>Cột 2</h2> -->
            <router-view v-slot="{ Component }">
                <transition name="zoom" >
                    <component :is="Component" />
                </transition>
            </router-view>    
        </div>
    </div>
</template>
<script>
import Navbar from "./components/navbar.vue"

export default {
    components: {
        Navbar,
    },
}

</script>

<style>
    .colum1-color {
        background-color: bisque;
    };
</style>
  