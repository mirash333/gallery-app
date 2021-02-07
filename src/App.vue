<template>
    <div class="bg-gray-200 h-full">
        <header-component></header-component>
        <div class="container mx-auto md:px-8 xl:px-0">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "App",
    components: {
        HeaderComponent: () => import("@/components/HeaderComponent"),
    },
    methods: {
        ...mapActions(["getPhotos"]),
    },
    created() {
        this.getPhotos();
    },
};
</script>

<style scoped lang="scss">
div {
    p {
        color: blue;
    }
}
</style>
