FROM node:18                
WORKDIR /server             

COPY src/ /server/src      
COPY package.json /server  

RUN npm install            

CMD ["npm", "start"]       
