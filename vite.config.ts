import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig({
  plugins: [react()],
  base: '/My-Career-Prediction/', // Set this to your repository name
})
