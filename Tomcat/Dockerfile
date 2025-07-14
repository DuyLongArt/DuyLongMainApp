FROM tomcat:10.1.18-jdk21-temurin
WORKDIR /usr/local/tomcat/webapps/

# Copy your WAR file.
# If your WAR file is named 'ROOT.war', it will be accessible directly at the root context (e.g., http://localhost:8080/).
# Otherwise, it will be accessible at http://localhost:8080/mywebapp/.
# Ensure 'mywebapp.war' is in the same directory as your Dockerfile.
COPY mywebapp.war .

EXPOSE 8080
CMD ["catalina.sh","run"]