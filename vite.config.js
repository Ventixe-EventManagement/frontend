// This Vite configuration was created with the help of ChatGPT (OpenAI)
// It is optimized for deploying a React app to Azure Static Web Apps,
// including automatic copying of staticwebapp.config.json into the build output.

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import copy from 'rollup-plugin-copy';

// Vite configuration for building a React app and deploying to Azure Static Web Apps
export default defineConfig({
  plugins: [
    // Enables support for React Fast Refresh, JSX, etc.
    react(),

    // Copies the Azure Static Web Apps config file to the output directory (dist/)
    copy({
      targets: [
        { src: 'staticwebapp.config.json', dest: 'dist' }
      ],
      hook: 'writeBundle' // Ensures the copy happens after the build is complete
    })
  ]
});
