FROM orchardup/nginx
ADD src/ /var/www
CMD 'nginx'