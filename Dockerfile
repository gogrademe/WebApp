FROM nginx
MAINTAINER Matt Aitchison <matt@lanciv.com>

ADD ./build/ /usr/share/nginx/html
