FROM node:6.5.0

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

CMD [ "scripts/start" ]

EXPOSE 8080 8443