FROM alpine:3.19
 
WORKDIR /user/src/app
 
COPY ./dist ./dist
COPY package.json .
COPY package-lock.json .

RUN npm ci --omit=dev
 
CMD [ "node", "dist/main.js" ]
