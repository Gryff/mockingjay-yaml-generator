# mockingjay-yaml-generator

Generate yaml files for mockingjay from a real service

## Usage

### Using docker

`docker run -v my-fakes-directory:/user/src/app/fakes gryff/mockingjay-yaml-generator [args]`

where args are
* [required] `--mockingjayUrl` or `-m`: the address of your mockingjay-server
    * you will need to use `host.docker.internal` if mockingjay is running inside docker, see [here](https://docs.docker.com/docker-for-mac/networking/#use-cases-and-workarounds) for more details
* [required] `--realUrl` or `-r`:
* [required] `--outputFilePath` or `-o`:

For example:
```
docker run \
    -v "${PWD}/fakes":/usr/src/app/fakes \
    gryff/mockingjay-yaml-generator \
    --mockingjayUrl "http://host.docker.internal:9099" \
    --realUrl "https://my-real-server.com" \
    --outputFilePath "./fakes/my-real-data.yaml"
```
Then check `./fakes/my-real-data.yaml` to see the output.

Args are also explained on the command line, just type `docker run gryff/mockingjay-yaml-generator`
