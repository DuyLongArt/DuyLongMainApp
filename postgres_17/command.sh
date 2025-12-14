podman pull postgres:17.5
podman run --name duylongdb \
  -e POSTGRES_PASSWORD=duylongpass \
  -e POSTGRES_USER=duylong \
  -e POSTGRES_DB=duylongdb \
  -p 6000:5432 \
  -d postgres:17.5



docker pull postgres:17.5
docker run --name duylongdb \
  -e POSTGRES_PASSWORD=duylongpass \
  -e POSTGRES_USER=duylong \
  -e POSTGRES_DB=duylongdb \
  -p 6000:5432 \
  -d postgres:17.5