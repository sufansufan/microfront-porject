FROM openresty/openresty:centos
WORKDIR /usr/local/openresty/nginx
COPY dist ./html