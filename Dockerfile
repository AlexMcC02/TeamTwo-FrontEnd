FROM node:14

WORKDIR /home/node/app

COPY package*.json ./

ARG UI_URL

ENV UI_URL ${UI_URL}

RUN npm ci --omit=dev

COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]