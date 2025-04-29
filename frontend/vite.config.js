import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    server: mode === 'development' ? {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
          secure: false,
        },
      },
    } : {},
    build: {
      sourcemap: true,
      minify: 'esbuild',
      cssMinify: true,
    },
    define: {
      'process.env.VITE_API_URL': mode === 'production' 
        ? '"https://your-backend-domain.vercel.app"'  // اپنے بیک اینڈ کے ڈومین کو یہاں لکھیں
        : '"http://localhost:3000"'
    }
  }
})
