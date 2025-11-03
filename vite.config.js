import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Repository adı <kullanıcıadı>.github.io olduğu için base '/' olmalıdır.
  base: '/',
  build: {
    outDir: 'dist'
  }
})