FROM ubuntu

RUN apt-get update
RUN apt-get install -y ca-certificates

WORKDIR /home

COPY . .

EXPOSE 8081

CMD ["./requester-backend-linux", "--env=ropsten"]
