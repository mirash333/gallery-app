<template>
    <div class="bg-gray-200 h-full">
        <header-component></header-component>
        <router-view></router-view>
    </div>
</template>

<script>
import HeaderComponent from "@/components/HeaderComponent";

export default {
    name: "App",
    components: {HeaderComponent},
}
</script>

<style scoped lang="scss">
div {
    p {
        color: blue;
    }
}
</style>
