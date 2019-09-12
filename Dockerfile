FROM node:10.16.3

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# Giving permissions
RUN chmod +x ./wait-for-it.sh

EXPOSE 3000 9229
CMD ["./wait-for-it.sh", "-t", "30", "mongo:27017", "--", "npm", "run", "docker"]
