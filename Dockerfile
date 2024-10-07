#Dockerfile

FROM node:20.11-alpine AS orrery-space-apss

WORKDIR /app
COPY . .
RUN npm ci
RUN npm run build
USER node:node
CMD ["node","build/index.js"]
