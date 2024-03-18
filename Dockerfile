FROM node:21
WORKDIR /Users/hava/source
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 80
CMD ["node", "server.js"]
