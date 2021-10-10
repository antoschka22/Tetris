docker stop ist_material_backend_test
docker build -t ist_material_backend:test .
docker run --rm -d -p 5000:5000 --name ist_material_backend_test ist_material_backend:test