<template>
    <router-link :to="`/photos/${image.id}`">
        <div class="gallery-item col-span-1 bg-gray-100 shadow-md" ref="galleryItem">
            <div class="gallery-item__image">
                <v-lazy-image class="transition duration-300" :src="image.urls.regular" :alt="image.alt_description" @load="isImageLoaded = true" />
                <canvas ref="canvas" v-show="!isImageLoaded"></canvas>
                <div class="spin" v-show="!isImageLoaded">
                    <svg class="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>
            </div>
        </div>
    </router-link>
</template>

<script>
import draw from "@/mixins/draw";
export default {
    name: "GalleryItem",
    mixins: [draw],
    data: () => {
        return {
            isImageLoaded: false
        }
    },
    props: {
        image: {
            type: Object,
        }
    },
    mounted() {
        this.draw({ref: 'galleryItem'})
    }
}
</script>

<style lang="scss">
.gallery-item{
    cursor: pointer;
    position: relative;
    height: 45vh;
    &__image{
        height: 100%;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(0.5);
        }
        canvas {
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            z-index: 2;
        }
    }
    &:hover{
        img{
            transform: scale(1.1);
            filter: unset;
        }
    }
}
</style>
