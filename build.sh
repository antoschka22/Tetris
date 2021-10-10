docker build -t docker.armstrongconsulting.com/ist_frontend frontend
docker build -t docker.armstrongconsulting.com/ist_backend backend

docker push docker.armstrongconsulting.com/ist_frontend
docker push docker.armstrongconsulting.com/ist_backend