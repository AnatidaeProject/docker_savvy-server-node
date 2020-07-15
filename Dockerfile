FROM node:14.5.0-alpine3.12

RUN apk add --no-cache \
    alpine-sdk \
    build-base \
    cairo \
    cairo-dev \
    poppler \
    poppler-qt5-dev

CMD [ "node" ]