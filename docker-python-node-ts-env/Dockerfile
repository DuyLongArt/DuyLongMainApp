FROM ubuntu:22.04

# Set environment variables
ENV PYTHON_VERSION=3.12.10
ENV NODE_VERSION=22.16.0
ENV TYPESCRIPT_VERSION=5.8.3

# Install dependencies
RUN apt-get update && apt-get install -y \
    curl \
    build-essential \
    python3-pip \
    python3-dev \
    && rm -rf /var/lib/apt/lists/*

# Install Python
RUN curl -O https://www.python.org/ftp/python/$PYTHON_VERSION/Python-$PYTHON_VERSION.tgz \
    && tar -xzf Python-$PYTHON_VERSION.tgz \
    && cd Python-$PYTHON_VERSION \
    && ./configure --enable-optimizations \
    && make altinstall \
    && cd .. \
    && rm -rf Python-$PYTHON_VERSION Python-$PYTHON_VERSION.tgz

# Install Node.js
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.3/install.sh | bash && \. "$HOME/.nvm/nvm.sh" && nvm install 22 && node -v # && nvm current  && npm -v && npm install -g typescript@$TYPESCRIPT_VERSION

# Set the working directory
WORKDIR /app

# Copy the application code (if any)
# COPY . .

# Expose any ports (if needed)
# EXPOSE 3000

# Command to run the application (if needed)
# CMD ["node", "your-app.js"]