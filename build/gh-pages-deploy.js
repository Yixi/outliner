const ghPage = require('gh-pages')
const path = require('path')
const fs = require('fs')

if (!fs.existsSync(path.join(__dirname, '../dist/.circleci/config.yml'))) {
  fs.mkdirSync(path.resolve(__dirname, '../dist/.circleci'))
  fs.copyFileSync(path.resolve(__dirname, '../.circleci/config.yml'),
    path.resolve(__dirname, '../dist/.circleci/config.yml'));
}

ghPage.publish(path.resolve(__dirname, '../dist'), {
  dotfiles: true
}, err => {
  if (err) {
    console.error('publish fail')
    console.error(err)
    process.exit(1)
  } else {
    console.log('publish success')
    process.exit(0)
  }
});
