import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // GitHub Pages project URL: https://domrachev-artem23.github.io/FinBuddy/
  base: '/FinBuddy/'
})
