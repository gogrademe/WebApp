FROM lanciv/nodejs

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app-src && cp -a /tmp/node_modules /opt/app-src/


ADD . /opt/app-src
WORKDIR /opt/app-src

RUN rm -fr node_modules && rm -fr build

RUN npm install -g gulp
RUN npm install
#
RUN NODE_ENV=production gulp build

RUN mkdir -p /opt/app/build && cp -a /opt/app-src/build /opt/app/build

RUN rm -fr /opt/app-src
