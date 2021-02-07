<template>
    <figure class="bg-gray-100 rounded-xl p-8 user shadow-md">
        <img
            class="w-32 h-32 rounded-full mx-auto"
            :src="userProfile.profile_image.large"
            alt=""
            width="384"
            height="512"
        />
        <div class="pt-6 space-y-4">
            <blockquote>
                <p v-if="userProfile.bio" class="text-lg font-bold">
                    “{{ userProfile.bio }}”
                </p>
            </blockquote>
            <figcaption>
                <div v-if="userProfile.name" class="text-green-500">
                    <p class="text-xl mb-4">
                        Full name: {{ userProfile.name }}
                    </p>
                </div>
                <div v-if="userProfile.total_collections">
                    Collections: {{ userProfile.total_collections }}
                </div>
                <div v-if="userProfile.total_like">
                    Likes: {{ userProfile.total_likes }}
                </div>
                <div v-if="userProfile.total_photos">
                    Total photos: {{ userProfile.total_photos }}
                </div>
                <div v-if="userProfile.followers_count">
                    Followers count: {{ userProfile.followers_count }}
                </div>
            </figcaption>
        </div>
    </figure>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
    name: "UserCard",
    data: () => {
        return {
            loading: false,
        };
    },
    computed: {
        ...mapState(["user"]),
        userProfile() {
            return this.$route.params.user || this.user;
        },
    },
    methods: {
        ...mapActions(["getUser"]),
    },
    created() {
        if (!this.$route.params.user) {
            this.loading = true;
            this.getUser({ username: this.$route.params.username }).then(
                () => (this.loading = false)
            );
        }
    },
};
</script>

<style scoped lang="scss">
.user {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 400px;
}
</style>
