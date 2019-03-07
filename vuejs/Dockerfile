FROM node

ARG proxy=""
RUN echo $proxy
RUN npm config set proxy $proxy
RUN npm i -g @vue/cli
CMD bash