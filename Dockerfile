FROM gliderlabs/alpine
RUN apk-install nginx

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/
RUN apk-install -t build-deps nodejs build-base python \
  && npm install -g npm \
  && npm install \
  && ./node_modules/gulp/bin/gulp.js --release \
  && npm cache clean \
  && apk del --purge build-deps
