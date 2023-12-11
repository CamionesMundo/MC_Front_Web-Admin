FROM node:16.0.0-alpine as build
WORKDIR /app

COPY ["package.json", "./"]

RUN apk add --update tzdata && \
cp /usr/share/zoneinfo/America/Lima /etc/localtime && \
echo "America/Lima" >  /etc/timezone

RUN npm install 
RUN npm run build

COPY .  ./ 

EXPOSE 4000

#CMD ["npm", "run all"]

ENTRYPOINT ["sh", "-c", "npm run start:prod"]
