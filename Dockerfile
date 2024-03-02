FROM node:18.17.0-alpine as build
WORKDIR /app

COPY ["package.json", "./"]

RUN apk add --update tzdata && \
cp /usr/share/zoneinfo/America/Lima /etc/localtime && \
echo "America/Lima" >  /etc/timezone

RUN npm install 

COPY .  ./ 

RUN npm run build

EXPOSE 5000

ENTRYPOINT ["sh", "-c", "npm run start:prod"]
