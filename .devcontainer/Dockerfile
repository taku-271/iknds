FROM debian:12-slim

RUN apt-get update && apt-get install -y zip unzip curl git nodejs npm docker.io

RUN curl -fsSL https://bun.sh/install | bash

RUN curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
RUN unzip awscliv2.zip
RUN ./aws/install

RUN rm -rf awscliv2.zip aws
