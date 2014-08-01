FROM lanciv/nodejs

# ADD package.json /tmp/package.json
# RUN cd /tmp && npm install
# RUN mkdir -p /opt/app && cp -a /tmp/node_modules /opt/app/
RUN node -v
ADD . /opt/app
#WORKDIR /opt/app

RUN rm -fr /opt/app/node_modules && rm -fr /opt/app/build

RUN npm install -g gulp
RUN cd /opt/app && npm install

RUN cd /opt/app && NODE_ENV=production gulp build
