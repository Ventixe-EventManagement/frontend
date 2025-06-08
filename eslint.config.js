// ESLint configuration file created with the assistance of ChatGPT (OpenAI).
// Includes support for React, React Hooks, and Fast Refresh using modern flat config format.
// Adjustments made to enforce consistent development practices and improve DX.
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

// Export ESLint configuration as an array of config blocks
export default [
  // Ignore the build output directory
  { ignores: ['dist'] },

  // Apply ESLint rules to all JavaScript and JSX files
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 2020, // ECMAScript version
      globals: globals.browser, // Use browser-specific globals (e.g., window, document)
      parserOptions: {
        ecmaVersion: 'latest', // Enable the latest ECMAScript features
        ecmaFeatures: { jsx: true }, // Enable JSX parsing
        sourceType: 'module', // Use ES module syntax
      },
    },
    plugins: {
      'react-hooks': reactHooks,       // Enforce rules of React Hooks
      'react-refresh': reactRefresh,   // Support for React Fast Refresh
    },
    rules: {
      ...js.configs.recommended.rules,              // Start with recommended JS rules
      ...reactHooks.configs.recommended.rules,      // Add recommended React Hooks rules

      // Flag unused variables unless they start with a capital letter or underscore
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      // Warn if components are exported in a way that breaks React Fast Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
];
