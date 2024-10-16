import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // Asegura que Vite escuche en todas las interfaces, necesario para Docker
    port: 4173,        // Usa el puerto 4173 para asegurar la correspondencia con Docker
    strictPort: true,  // Asegura que si el puerto 4173 está en uso, no cambiará automáticamente
    watch: {
      usePolling: true, // Necesario en algunos entornos Docker para recargar correctamente
    },
  },
})
