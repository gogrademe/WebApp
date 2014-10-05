FROM dockerfile/nodejs

ADD . /tmp/src
WORKDIR /tmp/src

RUN npm install -g gulp
RUN npm install

RUN gulp build --release

RUN mkdir -p /opt/app && cp -r /tmp/src/build/* /opt/app

RUN rm -fr /tmp/src

WORKDIR /opt/app
