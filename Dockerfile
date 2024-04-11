FROM node
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY package*.json ./
USER node
RUN ["npm", "ci"]
COPY --chown=node:node . .
EXPOSE 3000
RUN ["npx", "prisma", "migrate", "dev", "--name", "init"]
RUN ["npm", "run", "build"]
CMD ["node", "build"]