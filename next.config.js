/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config) => {
        config.externals = [...config.externals, { canvas: "canvas" }];  // required to make Konva & react-konva work
        return config;
    },
    reactStrictMode: false,
    distDir: 'build',
    output: 'export',
};

module.exports = nextConfig
