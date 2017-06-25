# Use the official go docker image built on debian.
FROM golang:1.8

# Install revel and the revel CLI.
RUN go get github.com/revel/revel
RUN go get github.com/revel/cmd/revel

# Grab the source code and add it to the workspace.
ADD . /go/src/chatter

# Use the revel CLI to start up our application.
ENTRYPOINT revel run chatter dev 9000

# Open up the port where the app is running.
EXPOSE 9000
