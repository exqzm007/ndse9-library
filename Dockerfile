FROM node

WORKDIR /app

COPY package.json /app
COPY yarn.lock /app
RUN "yarn"
COPY ./ /app

CMD ["yarn", "dev"]