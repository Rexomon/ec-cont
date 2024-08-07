# Gunakan image dasar Node.js
FROM node:16 AS base

# Buat direktori kerja
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json
COPY package.json ./

# Instal dependensi
RUN npm install

# Salin seluruh kode aplikasi
COPY . .

# Setel variabel lingkungan
ENV NODE_ENV=production

# Jalankan build script
CMD ["npm", "run", "build"]
