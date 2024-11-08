import { purgeCss } from 'vite-plugin-tailwind-purgecss';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import dotenv from 'dotenv'; // 引入 dotenv

// 加载.env 文件
dotenv.config();
export default defineConfig(() => {
	return {
		plugins: [sveltekit(), purgeCss()],
		server: {
			host: '0.0.0.0', // 监听所有网络接口
			port: 5173 ,
			proxy: {
				'/api': {
					target: process.env.API_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, '')
				}
			}
		}
	}
});