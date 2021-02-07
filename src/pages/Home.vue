<template>
    <div>
        <div class="container mx-auto">
            <template v-if="!loading">
                <banner-component :image="randomImage" @getRandomImage="getRandomImage"></banner-component>
                <gallery-list :randomImage="randomImage"></gallery-list>
            </template>
            <skeleton v-else></skeleton>
        </div>
    </div>
</template>

<script>
import BannerComponent from "@/components/BannerComponent";
import {mapActions, mapState} from "vuex";
import GalleryList from "@/components/GalleryList";
import {decode} from "blurhash";
import Skeleton from "@/components/Skeleton";
export default {
    name: "Home",
    components: {Skeleton, GalleryList, BannerComponent},
    data: () => {
        return {
            randomKey: undefined,
            randomImage: undefined,
            loading: true
        }
    },
    computed: {
        ...mapState(['photos']),
    },
    watch: {
        photos() {
            this.getRandomImage()
        },
    },
    methods: {
        ...mapActions(['getCollections','getPhotos']),
        getRandomImage() {
            if (!this.photos.length) return
            const key = Math.floor(Math.random() * this.photos.length)
            this.randomImage = this.photos[key]
        },
    },
    mounted() {
        this.getRandomImage()
    },
    created() {
        this.getPhotos().then(() => this.loading = false)
    }
}
</script>

<style scoped>

</style>
