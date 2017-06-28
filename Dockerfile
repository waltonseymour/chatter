FROM node:alpine

RUN apk update \
    && apk add ca-certificates wget \
    && update-ca-certificates

RUN wget -q -O go.tgz https://storage.googleapis.com/golang/go1.8.3.linux-amd64.tar.gz
RUN tar -C /usr/local -xzf go.tgz && rm go.tgz

ENV GOPATH /go
ENV PATH $GOPATH/bin:/usr/local/go/bin:$PATH

RUN mkdir -p "$GOPATH/src" "$GOPATH/bin" && chmod -R 777 "$GOPATH"

RUN mkdir /lib64 && ln -s /lib/libc.musl-x86_64.so.1 /lib64/ld-linux-x86-64.so.2
RUN apk add --no-cache git

# Install revel and the revel CLI.
RUN go get github.com/revel/revel && go get github.com/revel/cmd/revel

RUN mkdir -p /go/src/chatter

WORKDIR /go/src/chatter

COPY yarn.lock package.json /go/src/chatter/

RUN yarn install --pure-lockfile

# Grab the source code and add it to the workspace.
COPY . /go/src/chatter

RUN yarn build-prod

# Use the revel CLI to start up our application.
CMD revel run chatter prod 9000

# Open up the port where the app is running.
EXPOSE 9000
