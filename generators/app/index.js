'use strict'
const Generator = require('yeoman-generator')
const chalk = require('chalk')
const yosay = require('yosay')

module.exports = class extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(
      yosay(`Welcome to the breathtaking ${chalk.red('generator-vuecli-js-jest-antdesignvue')} generator!`)
    )

    const prompts = [
      {
        type: 'confirm',
        name: 'useDefaultSet',
        message: 'Would you like to use this Default?',
        default: true
      }
    ]

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.useDefaultSet;
      this.props = props
    })
  }

  writing () {
    if (this.props.useDefaultSet) {
      const specilCopyFiles = ['.eslintrc.js', '.browserslistrc']
      for (let i = 0; i < specilCopyFiles.length; i++) {
        this.fs.copy(
          this.templatePath(`default/${specilCopyFiles[i]}`),
          this.destinationPath(`./${specilCopyFiles[i]}`)
        )
      }
      this.fs.copy(
        this.templatePath('default'),
        this.destinationPath('./')
      )
    } else {
      this.log('除了 Default 目前沒有其它設定包，可以讓您使用。')
    }
  }

  install () {
    if (this.props.useDefaultSet) {
      this.log('\nInstall dependencies ============================================')
      this.installDependencies({
        yarn: true,
        npm: false,
        bower: false
      })
      // .then(() => console.log('Everything is ready!'))
    }
  }

  end () {
    if (this.props.useDefaultSet) {
      this.log('\nCheck your vue cli version ============================================')
      this.spawnCommand('vue', ['--version']).on('exit', (err) => {
        if (err) {
          this.log(chalk.white.bgRed.bold('請先安裝 yarn global add @vue/cli'))
        } else {
          this.log('\n' + chalk.green.bgBlack.bold('恭喜你!可以開始工作了...'))
        }
      })
    }
  }
}
