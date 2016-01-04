'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var packagejs = require(__dirname + '/../../package.json');
var fs = require('fs');
var path = require('path');

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
    },
    getEntitityNames: function () {
      var existingEntities = [],
      existingEntityNames = fs.readdirSync('.jhipster');
      existingEntityNames.forEach(function(entry) {
        var entityName = entry.replace('.json','');
        existingEntities.push(entityName);
      });
      this.existingEntities = existingEntities;
    }
  },

  prompting: function () {
    var done = this.async();

    if(this.options.force !== true) {
      var prompts = [{
        type: 'input',
        name: 'continue',
        message: 'Your project files will be modified. Are you sure you want to continue ? (y/N)',
        default: 'N'
      }]

      this.prompt(prompts, function (props) {
        if(props.continue.toUpperCase() !== 'Y') {
          process.exit(1);
        }
        done();
      }.bind(this));
    } else {
      done();
    }
  },

  writing: function () {

    var done = this.async();

    this.baseName = jhipsterVar.baseName;
    this.packageName = jhipsterVar.packageName;
    this.angularAppName = jhipsterVar.angularAppName;
    var javaDir = jhipsterVar.javaDir;
    var resourceDir = jhipsterVar.resourceDir;
    var webappDir = jhipsterVar.webappDir;

    //Remove when #2557 is merged
    this.replaceContent = function replaceContent (filePath, pattern, content) {
      this.log("modifying " + filePath);
      var fullPath = path.join(process.cwd(), filePath);
      var body = fs.readFileSync(fullPath, 'utf8');
      body = body.replace(pattern, content);
      fs.writeFileSync(fullPath, body);
    }

    this.template('src/main/java/package/config/_BasicAuthSecurityConfiguration.java', javaDir + '/config/BasicAuthSecurityConfiguration.java', this, {});
    if (this.existingEntities) {
      this.existingEntities.forEach(function(entityName) {
        this.replaceContent(javaDir + 'web/rest/' + entityName + 'Resource.java', '@RequestMapping("/api")', '@RequestMapping({"/api", "/api_basic"})');
      }, this);
    }
    done();
  }
});
