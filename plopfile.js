const fs = require('fs')
const path = require('path')
module.exports = function(plop) {
  // create your generators here
  plop.setGenerator('component', {
    description: 'react component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'Component name?',
      },
      { type: 'input', name: 'location', message: 'Location?', default: 'src/components' },
      {
        type: 'checkbox',
        name: 'stores',
        message: 'Which stores?',
        choices: () =>
          new Promise((res, rej) => {
            fs.readdir('./src/stores', (err, files) => {
              res(
                files
                  .map(file => path.parse(file).name)
                  .map(fileName =>
                    fileName
                      .slice(0, 1)
                      .toLowerCase()
                      .concat([fileName.slice(1)])
                  )
                  .filter(store => store !== 'rootStore')
              )
            })
          }),
      },
    ], // array of inquirer prompts
    actions: [
      {
        type: 'add',
        path: '{{location}}/{{name}}/index.js',
        templateFile: 'plop-templates/component.hbs',
      },
      {
        type: 'add',
        path: 'src/components/{{name}}/style.module.scss',
        templateFile: 'plop-templates/style.module.scss.hbs',
      },
    ], // array of actions
  })
}
