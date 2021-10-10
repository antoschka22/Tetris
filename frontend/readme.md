# Frontend


## App Infos
The frontend runs on the angular development Server ` localhost:4200`. Then you need to ng build your angular app, so that the app still works outside the angular development Server. Then host your app to `http://localhost:8080`. 

## Dockerfile content
The dockerfile allowes you to run your app on a nginx Server. Which runs on localhost:8080. You also create your own nginx.conf file and delete the standard ones

```
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm /usr/share/nginx/html/index.html
RUN rm /usr/share/nginx/html/50x.html
```


## Copy your index into the nginx folder
you need to copy your builded angular app into the nginx folder. 
```
COPY ist-material-frontend/dist/ist-material-frontend /usr/share/nginx/html
```