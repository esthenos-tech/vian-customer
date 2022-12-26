# pull official base image
FROM node:14.20.0-alpine

# set working directory
WORKDIR /fos-ui

# add `/app/node_modules/.bin` to $PATH
ENV PATH /fos-ui/node_modules/.bin:$PATH

# install app dependencies
COPY package.json ./

# add files to app
COPY . /fos-ui/

# install app dependencies 
RUN yarn install && \ 
    yarn cache clean

# Make port 3000 available to the world outside this container
EXPOSE 3000

# start app
CMD ["yarn", "start"]