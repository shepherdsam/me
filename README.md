# me
The source and infrastructure behind [shepherdsam.me](https://shepherdsam.me)

### How it works
It uses [Docker](https://docker.com) to create the [Node.js](https://nodejs.org) environment and [Restify](http://restify.com) to serve the content over HTTPS. The certificate is from [Lets Encrypt](https://letsencrypt.org).

### How to use
First, install [Docker](https://docker.com) and checkout this repository.

Optionally create `.config` file in the root directory. (See the `docker/config` file for available options.)

Run the following:
```
docker/build
docker/run
```

### Want https?
Add `email=fake@email.tld` and `domain=domain.tld` lines to the `.config` file.

Run `docker/certs` (with the Docker container running).

Then turn on https by adding `HTTPS=true` to the `.config` file.

Restart the container with `docker/restart`.

### To Update
From the host run `docker/update`. This pulls the latest changes from git and restarts the container. On start, the container will run `npm install` to update dependencies.
