FROM dockerfile/nodejs

ADD . /tmp/src
WORKDIR /tmp/src

RUN npm install -g gulp && npm install

RUN gulp build --release

RUN mkdir -p /opt/app && mv /tmp/src/build/* /opt/app

RUN rm -fr /tmp/src

WORKDIR /opt/app
