#!/bin/bash

# Prompt for project name
read -p "Enter project name: " project_name

# Create new directory for project
mkdir $project_name && cd $project_name

# Initialize a new npm project
npm init -y

# Install Vite, React, and Tailwind CSS as dependencies
npm install vite react react-dom -D
npm install tailwindcss postcss autoprefixer -D

# Create a new Tailwind CSS configuration file
npx tailwindcss init -p

# Create a new index.html file
touch index.html

# Create a new index.jsx file
mkdir src && cd src
touch index.jsx

# Add basic React code to index.jsx
echo "import React from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  return (
    <div className='bg-gray-200'>
      <h1 className='text-3xl font-bold text-center my-8'>Hello, world!</h1>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));" >> index.jsx

# Create a new styles.css file
cd ..
mkdir styles && cd styles
touch styles.css

# Import Tailwind CSS into styles.css
echo "@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';" >> styles.css

# Create a new Vite configuration file
cd ..
touch vite.config.js

# Add basic Vite configuration to vite.config.js
echo "import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from 'tailwindcss';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss('./tailwind.config.js'),
  ],
});" >> vite.config.js

# Create a new package.json script to run Vite
cd ..
npm set-script start "vite"

