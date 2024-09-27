FROM node:alpine As develop_kyeong

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN npm install

COPY . .

RUN npm run build

FROM node:alpine as Product

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN npm install -g yarn
RUN yarn add --prod

COPY --from=develop_kyeong /usr/src/app/dist ./dist

CMD ["node","dist/apps/reservations/main"]