FROM alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN apk --no-cache add -t build-deps nodejs build-base git python \
  && npm install -g npm \
  && npm install \
  && npm run build \
  && npm cache clean \
  && apk --no-cache del --purge build-deps
