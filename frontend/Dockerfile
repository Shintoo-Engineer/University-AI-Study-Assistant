FROM node:22-alpine

WORKDIR /app

COPY frontend/package*.json ./

RUN npm ci

COPY frontend .

ENV NODE_ENV=production

RUN npm run build

EXPOSE 3001

CMD ["npm", "run", "start", "--", "-p", "3001"]