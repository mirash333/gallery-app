<template>
    <router-link router-link :to="`/photos/${image.id}`">
        <div class="bg-gray-100 shadow banner mb-10" :class="{'fullscreen': fullScreen}" ref="banner">
            <div v-if="timeInterval" class="progress bg-green-500" :style="`width:${timer}%`"></div>
            <template v-if="photos.length">
                <img v-show="isImageLoaded" :src="image.urls.full" :alt="image.alt_description" height="400"
                     @load="isImageLoaded = true">
            </template>
            <div class="banner__description"></div>
            <canvas ref="canvas" v-show="!isImageLoaded"></canvas>
            <div class="spin" v-show="!isImageLoaded">
                <svg class="animate-spin h-10 w-10 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        </div>
    </router-link>

</template>

<script>
import {mapState} from 'vuex'
import draw from "@/mixins/draw";

export default {
    name: "BannerComponent",
    mixins: [draw],
    props: {
        image: {
            type: Object
        },
        timerIsNeeded: {
            type: Boolean,
            default: false
        },
        fullScreen: {
            type: Boolean,
            default: false
        }
    },
    data: () => {
        return {
            timer: 0,
            isImageLoaded: false,
            timeInterval: undefined
        }
    },
    computed: {
        ...mapState(['photos']),

    },
    watch: {
        timer() {
            if (this.timer === 100) {
                this.$emit('getRandomImage')
                this.timer = 0
            }
        },
        image(){
          this.draw({ref: 'banner'})
        },
        isImageLoaded() {
            if (!this.timerIsNeeded) return
            if (this.isImageLoaded) {
                this.timeInterval = setInterval(() => {
                    this.timer++
                }, 100)
            } else {
                clearInterval(this.timeInterval)
            }
        }
    },
    mounted() {
        this.draw({ref: 'banner'})
    }
}
</script>

<style lang="scss">
div.fullscreen {
    position: absolute;
    top: 72px;
    left: 0;
    width: 100vw;
    height: calc(100vh - 72px);
}

.banner {
    height: calc(100vh - 143px);
    overflow: hidden;
    position: relative;

    img {
        height: 100%;
        width: 100%;
        object-fit: cover;
    }

    canvas {
        width: 100%;
        height: 100%;
    }

    .progress {
        height: 3px;
        transition: 0.28s;
        position: absolute;
        top: 0;
        left: 0;
    }
}
</style>
