FROM anatidae/savvy-server-node:1.0.0

WORKDIR /app/
COPY . /app/

RUN npm install
CMD [ "npm", "run", "test" ]