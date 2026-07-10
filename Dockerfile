FROM node:20-alpine

WORKDIR /home/ec2-user/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
