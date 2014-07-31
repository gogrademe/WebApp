FROM lanciv/nodejs

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/

WORKDIR /opt/app
ADD . /opt/app

RUN npm install -g gulp
RUN NODE_ENV=production gulp build

RUN ls ./build
