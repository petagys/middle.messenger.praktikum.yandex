FROM node:16.15
WORKDIR /var/www
COPY package*.json ./
RUN npm i
COPY . .
EXPOSE 3000
CMD npm run start