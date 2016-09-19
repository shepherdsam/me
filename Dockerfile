FROM node:6.5.0

WORKDIR /usr/src/app

CMD [ "npm", "start" ]

EXPOSE 8080