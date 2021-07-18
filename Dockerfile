# Frontend builder
FROM node:lts-alpine as frontend-builder

WORKDIR /app

COPY ./client/package.json ./client/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./client .

RUN yarn build

# Backend builder

FROM node:lts-alpine as backend-builder

WORKDIR /app

COPY ./server/package.json ./server/yarn.lock ./

RUN yarn install --frozen-lockfile

COPY ./server .

RUN yarn build

FROM node:lts-slim


# main
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

COPY --from=frontend-builder /app/build /app/build

COPY --from=backend-builder /app/dist /app/

COPY --from=backend-builder /app/package.json /app/yarn.lock /app/

RUN yarn install --frozen-lockfile --production

CMD [ "node", "index.js" ]