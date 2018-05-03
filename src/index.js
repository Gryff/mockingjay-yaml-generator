const yargs = require('yargs')
const mockingjayYamlGenerator = require('./mockingjayYamlGenerator')

const argv = yargs
  .usage('$0 --mockingjayUrl=<> --realUrl=<> --outputFilePath=<>')
  .option('mockingjayUrl', {
    alias: 'm',
    demandOption: true,
    describe: 'the url of your instance of mockingjay server',
    type: 'string'
  })
  .option('realUrl', {
    alias: 'r',
    demandOption: true,
    describe: 'the url of your real server to get data from',
    type: 'string'
  })
  .option('outputFilePath', {
    alias: 'o',
    demandOption: true,
    describe: 'where you want the resulting yaml to be outputted',
    type: 'string'
  })
  .help()
  .argv

mockingjayYamlGenerator(argv.mockingjayUrl, argv.realUrl, argv.outputFilePath)
  .then(() => console.log(`Success, yaml has been outputted to ${argv.outputFilePath}`))
  .catch(err => {
    console.error(err.message)
    process.exit(1)
  })
