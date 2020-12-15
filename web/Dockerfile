FROM node:alpine
WORKDIR /app
COPY /backend/package*.json /app/
RUN npm install
WORKDIR /app/front
COPY /front/package*.json /app/front/
RUN npm install
COPY /front/ /app/front/
RUN npm run build
WORKDIR /app
COPY /backend/ /app/

CMD [ "npm", "start" ]
