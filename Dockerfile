FROM gliderlabs/alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN apk-install -t build-deps nodejs build-base git python \
  && npm install -g npm \
  && npm install \
  && npm run build \
  && npm cache clean \
  && apk del --purge build-deps
