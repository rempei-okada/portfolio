import path from "path"
import withImageOptimizer from "next-export-optimize-images"

/** @type {import('next').NextConfig} */
const nextConfig = {

    output: 'export',
    // basePath: "/portfolio",

    /**
     * Disable server-based image optimization. Next.js does not support
     * dynamic features with static exports.
     *
     * @see https://nextjs.org/docs/pages/api-reference/components/image#unoptimized
     */
    images: {  },
    compiler: {
    },
    sassOptions: {

    },
    webpack: (config, options) => {
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            use: ['raw-loader', 'glslify-loader'],
        });

        return config;
    }
};

export default withImageOptimizer(nextConfig);
