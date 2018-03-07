FROM node:9

RUN mkdir -p /usr/local/app
WORKDIR /usr/local/app

COPY . .

RUN ["rm", "-rf", "node_modules"]
RUN ["yarn", "install"]
CMD ["yarn", "start"]
