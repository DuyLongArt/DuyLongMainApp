FROM ubuntu:22.04

# Set environment variables
ARG PYTHON_VERSION=3.12.10
ARG NODE_VERSION=22.16.0
ARG TYPESCRIPT_VERSION=5.8.3
ARG CONTAINER_TIMEZONE="Asia/Ho_Chi_Minh"

# Set DEBIAN_FRONTEND to noninteractive for automated installs
# Set the TZ environment variable, which many applications and the system use for timezone.
ENV DEBIAN_FRONTEND=noninteractive \
    TZ=${CONTAINER_TIMEZONE}
# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    git \
    build-essential \
    libssl-dev \
    zlib1g-dev \
    libbz2-dev \
    libreadline-dev \
    libsqlite3-dev \
    wget \
    llvm \
    libncurses5-dev \
    libncursesw5-dev \
    xz-utils \
    tk-dev \
    liblzma-dev\
    bash

ENV PYENV_ROOT="/root/.pyenv"
ENV PATH="$PYENV_ROOT/bin:$PATH"
RUN curl https://pyenv.run | bash \
    && pyenv install ${PYTHON_VERSION} && pyenv global ${PYTHON_VERSION} \
    && export PYENV_ROOT="/root/.pyenv" && \
    export PATH="$PYENV_ROOT/bin:$PATH" && \
    eval "$(pyenv init --path)" && \
    eval "$(pyenv init -)" && \
    ln -sf "$PYENV_ROOT/versions/${PYTHON_VERSION}/bin/python3" /usr/bin/python3 && \
    ln -sf "$PYENV_ROOT/versions/${PYTHON_VERSION}/bin/python" /usr/bin/python
#Install Node.js

ENV NVM_DIR="/root/.nvm"
ENV PATH="${NVM_DIR}/versions/node/v${NODE_VERSION}/bin:${PATH}"
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash \
 && \. "$HOME/.nvm/nvm.sh" \
 && nvm install 22 && node -v # && \
 nvm current  && npm -v && npm install -g typescript@$TYPESCRIPT_VERSION 


# Set the working directory
WORKDIR /home/app
EXPOSE 22222

CMD ["tail","-f","/dev/null"]