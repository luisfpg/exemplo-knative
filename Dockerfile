FROM node:16-alpine
RUN mkdir /app
WORKDIR /app
ADD node_modules ./node_modules
ADD src ./src
ADD package.json .
ENTRYPOINT [ "npx", "ts-node", "src/server.ts" ]
