FROM node

MAINTAINER devlee <devlee@outlook.com>

RUN apt-get update; \
    apt-get -y upgrade

RUN mkdir /home/git; \
    cd /home/git; \
    sudo git clone https://github.com/devlee/di-demo-web.git -b master

WORKDIR /home/git/di-demo-web

EXPOSE 6677