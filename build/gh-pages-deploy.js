const ghPage = require('gh-pages')
const path = require('path')

ghPage.publish(path.resolve(__dirname, '../dist'), {
  user: 'Deploy',
  email: 'Deploy@yixi.pro'
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
