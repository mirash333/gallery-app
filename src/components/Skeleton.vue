<template>
    <div>
        <div
            class="bg-gray-100 shadow banner"
            :class="{ 'mb-10': !offGallery, fullscreen: fullScreen }"
        >
            <div class="spin">
                <template v-if="errors['photos']">
                    <svg
                        class="h-20 w-20 text-green-500 mx-auto mb-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    <p class="font-bold text-center">{{ errors["photos"] }}</p>
                </template>
                <template v-else>
                    <svg
                        class="animate-spin h-10 w-10 text-green-500"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle
                            class="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                        ></circle>
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                    </svg>
                </template>
            </div>
        </div>

        <div v-if="!offGallery" class="gallery-wrapper">
            <div class="grid grid-cols-4 gap-10 gallery mb-10" ref="grid">
                <template v-for="(photo, index) in photos">
                    <div
                        class="gallery-item col-span-1 bg-gray-100 shadow-md"
                        ref="galleryItem"
                        :key="index"
                    >
                        <div class="spin">
                            <template v-if="errors['photos']">
                                <svg
                                    class="h-20 w-20 text-green-500 mx-auto mb-5"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <p class="font-bold text-center">
                                    {{ errors["photos"] }}
                                </p>
                            </template>
                            <template v-else>
                                <svg
                                    class="animate-spin h-10 w-10 text-green-500"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <circle
                                        class="opacity-25"
                                        cx="12"
                                        cy="12"
                                        r="10"
                                        stroke="currentColor"
                                        stroke-width="4"
                                    ></circle>
                                    <path
                                        class="opacity-75"
                                        fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                    ></path>
                                </svg>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Skeleton",
    props: {
        offGallery: {
            type: Boolean,
            default: false,
        },
        fullScreen: {
            type: Boolean,
            default: false,
        },
    },
    computed: {
        ...mapState(["photos", "errors"]),
    },
};
</script>

<style scoped lang="scss">
.gallery-item {
    cursor: default;
}
</style>
