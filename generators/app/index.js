'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var packagejs = require(__dirname + '/../../package.json');

// Stores JHipster variables
var jhipsterVar = {moduleName: 'basic-auth'};

// Stores JHipster functions
var jhipsterFunc = {};

module.exports = yeoman.generators.Base.extend({

  initializing: {
    templates: function (args) {
      this.composeWith('jhipster:modules', {
        options: {
          jhipsterVar: jhipsterVar,
          jhipsterFunc: jhipsterFunc
        }
      });
    },
    displayLogo: function () {
      // Have Yeoman greet the user.
      this.log(yosay(
        'Welcome to the ' + chalk.red('JHipster basic-auth') + ' generator! ' + chalk.yellow('v' + packagejs.version)
      ));
    }
  },

  prompting: function () {
    var done = this.async();

    var prompts = [{
      type: 'input',
      name: 'message',
      message: 'Your project files will be modified. Are you sure you want to continue ? (y/N)',
      default: 'N'
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    var done = this.async();

    this.baseName = jhipsterVar.baseName;
    this.packageName = jhipsterVar.packageName;
    this.angularAppName = jhipsterVar.angularAppName;
    var javaDir = jhipsterVar.javaDir;
    var resourceDir = jhipsterVar.resourceDir;
    var webappDir = jhipsterVar.webappDir;

    if(this.props.message.toUpperCase() !== 'Y') {
        process.exit(1);
    }

    this.template('src/main/java/package/config/_BasicAuthSecurityConfiguration.java', javaDir + '/config/BasicAuthSecurityConfiguration.java', this, {});

    done();
  }
});
