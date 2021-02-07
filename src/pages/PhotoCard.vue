<template>
    <div>
        <div class="container mx-auto">
            <banner-component></banner-component>
            <gallery-list></gallery-list>
        </div>
    </div>
</template>

<script>
import BannerComponent from "@/components/BannerComponent";
import GalleryList from "@/components/GalleryList";
import {mapActions} from "vuex";

export default {
    name: "PhotoCard",
    components: {GalleryList, BannerComponent},
    methods: {
      ...mapActions(['getPhoto'])
    },
    created() {
        this.getPhoto({id: this.$route.params.id})
    }
}
</script>

<style scoped>

</style>
