FROM node:20-alpine

WORKDIR /home/ec2-user/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3001

CMD ["npm", "start"]  
          
CMD ["docker compose down"]
CMD ["docker compose build --no-cache"]
CMD ["sudo docker compose build"]
CMD ["sudo docker images"]
CMD ["sudo docker ps -a"] 
