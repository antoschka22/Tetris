FROM nginx:1.17.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf

RUN rm /usr/share/nginx/html/index.html
RUN rm /usr/share/nginx/html/50x.html

COPY ist-material-frontend/dist/ist-material-frontend /usr/share/nginx/html
# copies new files or directories from (index.html)
# and adds them to the filesystem of the container at the path  (/usr/share/nginx/html)
# ! how do i know the path to that filesystem; docker.hub/nginx