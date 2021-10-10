# IST Material Backend

using python 3.9 base image

build command:

```bash
$ docker build -t IST_Material_backend .
```

run command:

```bash
$ docker run ....
```

| folder | description|
|:-----|:--------:|
| src   | sourcecode | 
| src/dao   | alle Datenbank operationen |
| openapi | rest api paths with the documentation
<br><br>
src folder
- folder for the backend code

<br/>
!!! <br/>fetchall: returns a list
<br/> fetchaone: gives "None" if empty and an Object if not empty
<br/> with "postman" you can test API-Request