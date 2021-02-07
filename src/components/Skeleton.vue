<template>
    <div>
        <div class="bg-gray-100 shadow banner mb-10">
            <div class="spin">
                <svg class="animate-spin h-10 w-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                     viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
            </div>
        </div>

        <div class="gallery-wrapper">
            <div class="grid grid-cols-4 gap-10 gallery mb-10" ref="grid">
                <template v-for="(photo,index) in photos">
                    <div class="gallery-item col-span-1 bg-gray-100 shadow-md" ref="galleryItem" :key="index">
                        <div class="spin">
                            <svg class="animate-spin h-10 w-10 text-green-500" xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 24 24">
                                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                        stroke-width="4"></circle>
                                <path class="opacity-75" fill="currentColor"
                                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "Skeleton",
    computed: {
        ...mapState(['photos'])
    }
}
</script>

<style scoped lang="scss">
.gallery-item{
    cursor: default;
}
</style>
