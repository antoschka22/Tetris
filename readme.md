# IST Material Project

## How to use
clone the project to your folder of choice
```
git clone https://git.armstrongconsulting.com/AC/antonio-demo.git
```
<br>
create a data folder in the database folder

<br><br>

## deployment website
- frontend => d1:8080 <br>
- backend => d1:5000/api/v1
# Users & Passwords
1. Admin
    - mail:
        - admin@gmail.com
    - password
        - admin
2. User
    - mail:
        - antonio@gmail.com
    - password
        - test

# Technologies used
1. Database
    - Database : Postgres
1. Backend
    - Python
    - Connexion, Flask, PsycoPg2
    - JWT Tokens
    - nginx (frontend webserver)
    - git
1. Frontend
    - Angular
    - Bootstrap
- Docker
<br/><br/>

# docker-compose commands

```bash
docker-compose down
```
```bash
docker-compose build
```
```bash
docker-compose up -d
```
<br/><br/>

# Build.sh file
when you run the following command in the terminal
```
./build.sh
```
your creating the ``docker.armstrongconsultin.com/ist_frontend`` images and then pushing them into the repository. So you just need to pull the images when your in the server and execute the docker-compose file
<br><br>
# Notes

**docker-compose file**: creating all the containers which are based on the images + more information<br/><br/>
**.gitignore** : what should not be shown on github (in our case the data from the database)<br/><br/>
**docker-compose build**: you do this because the files are being imported in the image