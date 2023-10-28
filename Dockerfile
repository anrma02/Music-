FROM node:18.18.0-alpine as build
EXPOSE 3000
WORKDIR /react-vite-app
WORKDIR /react-vite-app

EXPOSE 3000

COPY package.json package-lock.json ./

RUN npm install  
RUN npm run build
COPY . ./

CMD ["npm", "run", "dev"]