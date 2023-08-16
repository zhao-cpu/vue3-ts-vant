import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import WindiCSS from 'vite-plugin-windicss';
import * as path from 'path';
import Components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers';

import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import removeConsole from 'vite-plugin-remove-console';
import AutoImport from 'unplugin-auto-import/vite';

export default defineConfig(() => {
    return {
        plugins: [
            vue(),
            WindiCSS(),
            Components({
                resolvers: [VantResolver()],
            }),
            createSvgIconsPlugin({
                // 指定需要缓存的图标文件夹(路径为存放所有svg图标的文件夹不单个svg图标)
                iconDirs: [path.resolve(process.cwd(), 'src/assets')],
                // 指定symbolId格式
                symbolId: 'icon-[dir]-[name]',
            }),
            removeConsole(),
            AutoImport({
                imports: ['vue', 'vue-router'],
                dirs: ['./src/**'],
                dts: './auto-imports.d.ts',
            }),
        ],
        build: {
            outDir: 'dist',
        },
        server: {
            host: '0.0.0.0',
            port: 8888,
            open: false,
            strictPort: false,

            proxy: {
                '/api': {
                    target: 'http://swy.mnsn.cn',
                    changeOrigin: true,
                    rewrite: (path) => path.replace(/^\/api/, ''),
                },
            },
        },
        resolve: {
            // 路径别名配置
            alias: {
                '@': path.resolve(__dirname, 'src'),
            },
        },
    };
});
