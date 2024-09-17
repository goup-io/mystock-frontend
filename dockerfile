FROM node:18-alpine

WORKDIR /frontend

COPY package*.json ./

COPY ./src ./src
COPY ./public ./public
COPY ./postcss.config.js ./postcss.config.js 
COPY ./tailwind.config.js ./tailwind.config.js 

RUN npm install \
    && npm run build 
     
EXPOSE 3000

CMD ["npm", "start"]
