FROM ubuntu:22.04

# Set environment variables
ENV PYTHON_VERSION=3.12.10
# Install dependencies
WORKDIR /home/app
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
    && rm -rf Python-$PYTHON_VERSION Python-$PYTHON_VERSION.tgz && cd ~/app/python_api && pip install -r requirements.txt
# Set the working directory


# Copy the application code (if any)

# Expose any ports (if needed)
# EXPOSE 3000

# Command to run the application (if needed)
# CMD ["node", "your-app.js"]