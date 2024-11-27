    
FROM node:18.15.0 AS base

WORKDIR /app

COPY package* ./
RUN yarn install --frozen-lockfile

RUN yarn global add ts-node

ENV PATH /app/node_modules/.bin:/usr/local/lib/node_modules:$PATH

COPY . ./

ENV PORT=5100

EXPOSE 5100

FROM base AS development
ENV NODE_ENV=development

CMD ["npm","run" ,"dev"]
