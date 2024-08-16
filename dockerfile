FROM node:20.14.0

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 3006

CMD ["npm", "start"]
