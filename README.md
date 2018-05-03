# mockingjay-yaml-generator

Generate yaml files for mockingjay from a real service

## Usage

### Using docker

`docker build -t yaml-generator .`

`docker run -v "${PWD}":/user/src/app yaml-generator [args]`

where args are
* [required] `--mockingjayUrl` or `-m`: the address of your mockingjay-server
    * you will need to use `host.docker.internal` if mockingjay is running inside docker, see [here](https://docs.docker.com/docker-for-mac/networking/#use-cases-and-workarounds) for more details
* [required] `--realUrl` or `-r`:
* [required] `--outputFilePath` or `-o`:

For example:
```
docker run \
    -v "${PWD}":/usr/src/app \
    yaml-generator \
    --mockingjayUrl "http://host.docker.internal:9099" \
    --realUrl "https://my-real-server.com" \
    --outputFilePath "my-real-data.yaml"
```

Args are also explained on the command line, just type `docker run yaml-generator`
