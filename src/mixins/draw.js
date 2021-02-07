import {decode} from "blurhash";

export default {
    methods: {
        draw({ref}) {
            this.isImageLoaded = false
            const width = this.$refs[ref].clientWidth
            const height = this.$refs[ref].clientHeight
            const pixels = decode(this.image.blur_hash, width, height, 1)
            const ctx = this.$refs.canvas.getContext('2d')
            const imageData = ctx.createImageData(width, height)
            imageData.data.set(pixels)
            ctx.putImageData(imageData, 0, 0)
        },
    },
}
