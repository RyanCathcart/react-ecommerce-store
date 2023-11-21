import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(() => {
  return {
    build: {
      outDir: "../ReactECommerceStore.Api/wwwroot",
    },
    server: {
      port: 3000,
    },
    plugins: [react()],
  };
});
