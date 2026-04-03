FROM node:25.8.1-alpine3.22
WORKDIR /app
EXPOSE 3000

COPY package*.json ./
RUN npm install
COPY . ./

CMD ["npm", "run", "dev"]