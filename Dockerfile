FROM node:18.16.1

WORKDIR /var/www/cakeplabs-server

COPY package*.json ./

RUN npm install 
RUN npm install -g nodemon 

COPY ./ ./

EXPOSE 3000

CMD ["nodemon", "app.js"]