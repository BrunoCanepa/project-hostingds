FROM node:18                
WORKDIR /server             

COPY src/ /server/src      
COPY package.json /server  

RUN npm install    

EXPOSE 8080

CMD ["npm", "start"]       
