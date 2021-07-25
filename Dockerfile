FROM node:latest

EXPOSE 3000

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY . .

CMD ["npm","start"]