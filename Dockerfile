FROM orchardup/nginx
ADD build/ /var/www
CMD 'nginx'
