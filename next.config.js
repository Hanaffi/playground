/** @type {import('next').NextConfig} */
const nextConfig = {
    sassOptions:{
        prependData: `
        @import "app/styles/_colors";
        @import "app/styles/_mixins";
        `

    }
}

module.exports = nextConfig
