# docker-python-node-ts-env

This project sets up a Docker environment with Python 3.12.10, Node.js 22.16.0, and TypeScript 5.8.3.

## Prerequisites

Make sure you have Docker installed on your machine. You can download it from [Docker's official website](https://www.docker.com/get-started).

## Building the Docker Image

To build the Docker image, navigate to the project directory and run the following command:

```bash
docker build -t python-node-ts-env .
podman build -t python-node-ts-env .
```

## Running the Docker Container

After building the image, you can run a container using the following command:

```bash
docker run -it python-node-ts-env
podman-compose up
docker compose up
```

This will start a new container with an interactive terminal.

## Environment Setup

The Dockerfile sets up the following:

- **Python 3.12.10**: A popular programming language for various applications.
- **Node.js 22.16.0**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **TypeScript 5.8.3**: A superset of JavaScript that compiles to plain JavaScript.
## Intergrate with VsCode
"docker dockerPath": "podman" and using VsCode attach to running container
## Additional Information

Feel free to modify the Dockerfile to add any additional dependencies or configurations as needed for your project.
