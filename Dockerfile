FROM gliderlabs/alpine
RUN apk-install nginx

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN apk-install -t build-deps nodejs build-base python \
  && npm install -g npm \
  && npm install \
  && npm install gulp -g \
  && gulp --release \
  && npm cache clean \
  && apk del --purge build-deps

COPY . /usr/src/app
