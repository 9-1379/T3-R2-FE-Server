FROM node:lts-alpine as build-stage

#컨테이너 내부에서 /app 디렉토리를 작업 디렉토리로 설정
WORKDIR /app

# package.json 및 package-lock.json 파일을 현재 디렉토리 로 복사 및 설치
COPY package*.json ./
RUN npm install --production

COPY . .

RUN npm run build

FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


