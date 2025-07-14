FROM postgres:17.5

COPY ./init.sql /docker-entrypoint-initdb.d/

# Example: Create a new user or database (PostgreSQL's entrypoint handles this)
ENV POSTGRES_USER=duylong \
POSTGRES_PASSWORD=duylongpass \
POSTGRES_DB=duylongdb

# Example: If you need to install other tools (e.g., Python, Node.js) on *this* image,
# you would do it here, but be aware it will make your image larger.
# RUN apt-get update && apt-get install -y --no-install-recommends python3-pip

# Set a default command if needed (the postgres image has a default ENTRYPOINT)
CMD ["postgres"]