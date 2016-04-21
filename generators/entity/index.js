'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var packagejs = require(__dirname + '/../../package.json');
var shelljs = require('shelljs');
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
      this.log(
        'Running ' + chalk.red('JHipster ' + jhipsterVar.moduleName) + ' generator! ' + chalk.yellow('v' + packagejs.version)
      );
    },
    getEntitityNames: function () {
      var existingEntities = [],
      existingEntityNames = [];
      try{
        existingEntityNames = fs.readdirSync('.jhipster');
      } catch(e) {
        this.log(chalk.red.bold('ERROR!') + ' Could not read entities, you might not have generated any entities yet. I will continue to install basic auth, entities will not be updated...\n');
      }

      existingEntityNames.forEach(function(entry) {
        if(entry.indexOf('.json') !== -1){
          var entityName = entry.replace('.json','');
          existingEntities.push(entityName);
        }
      });
      this.existingEntities = existingEntities;
    }
  },

  writing: {
    setupGlobalVar : function () {
      this.baseName = jhipsterVar.baseName;
      this.packageName = jhipsterVar.packageName;
      this.javaDir = jhipsterVar.javaDir;
    },

    writeFiles : function () {
      var done = this.async();

      if(this.options.clean === true) {
        if (this.existingEntities) {
          this.existingEntities.forEach(function(entityName) {
            jhipsterFunc.replaceContent(this.javaDir + 'web/rest/' + entityName + 'Resource.java', '@RequestMapping({"/api", "/api_basic"})', '@RequestMapping("/api")');
          }, this);
        }

      } else {
        if (this.existingEntities) {
          this.existingEntities.forEach(function(entityName) {
            jhipsterFunc.replaceContent(this.javaDir + 'web/rest/' + entityName + 'Resource.java', '@RequestMapping("/api")', '@RequestMapping({"/api", "/api_basic"})');
          }, this);
        }
      }
      done();
    },

  }
});
