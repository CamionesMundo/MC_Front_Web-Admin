FROM node:16.0.0
WORKDIR /usr/app_front_admin
COPY package.json .
RUN npm install --quiet
RUN npm run build
COPY . .