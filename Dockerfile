FROM lanciv/nodejs

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/


ADD . /opt/app
WORKDIR /opt/app

RUN rm -fr node_modules && rm -fr build

RUN npm install -g gulp
RUN npm install

RUN NODE_ENV=production gulp build

RUN mv /opt/app/build /opt/app-built
RUN rm -fr /opt/app
RUN mv /opt/app-built /opt/app
