FROM node:18.14-alpine as builder
WORKDIR '/usr/app'
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

FROM nginx:stable
EXPOSE 3000
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /usr/app/build /usr/share/nginx/html
