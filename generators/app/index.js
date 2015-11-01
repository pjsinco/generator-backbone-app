'use strict';
var generators = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

var BackboneApp = generators.Base.extend({

    promptUser: function() {

        var done = this.async();

        console.log(this.yeoman);

        var prompts = [
            {
                type: 'input',
                name: 'appName',
                message: 'What is your app\'s name?',
                default: 'Your app name',
            }, 
            {
                type: 'confirm',
                name: 'addSass',
                message: 'Would you like to include scaffolding for Sass?',
                default: true,
            }
        ];

        this.prompt(prompts, function(answers) {

            this.appName = answers.appName;
            this.addSass = answers.addSass;

            done();

        }.bind(this));

    },

    scaffoldFolders: function() {
        mkdirp.sync('./src');
        mkdirp.sync('./src/img');
        mkdirp.sync('./src/js');
        mkdirp.sync('./src/js/models');
        mkdirp.sync('./src/js/views');
        mkdirp.sync('./src/js/collections');
        mkdirp.sync('./src/js/routers');
        mkdirp.sync('./src/js/util');
        mkdirp.sync('./src/js/vendor');

        if (this.addSass) {
            mkdirp.sync('./src/sass');
            mkdirp.sync('./src/sass/utilities');
            mkdirp.sync('./src/sass/base');
            mkdirp.sync('./src/sass/layout');
            mkdirp.sync('./src/sass/modules');
            mkdirp.sync('./src/sass/utilities');
        }
    },

    copyFiles: function (attribute) {
        console.log('Source root: ' + this.sourceRoot());
        console.log('destinationRoot: ' + this.destinationRoot());
        console.log('destinationPath: ' + this.destinationPath());
        console.log('templatePath: ' + this.templatePath());
        
        this.template('_index.html', 'index.html');
        this.template('_package.json', 'package.json');
    
        this.copy('_bower.json', 'bower.json');
        this.copy('_main.js', './src/js/main.js');

        if (this.addSass) {
            this.copy('_style.scss', './src/sass/_style.scss');

            this.copy('_blank.scss', './src/sass/base/_base.scss');
            this.copy('_base_index.scss', './src/sass/base/_index.scss');

            this.copy('_layout_index.scss', './src/sass/layout/_index.scss');
            
            this.copy('_modules_index.scss', './src/sass/modules/_index.scss');

            this.copy('_utilities_index.scss', './src/sass/utilities/_index.scss');
            this.copy('_variables.scss', './src/sass/utilities/_variables.scss');
            this.copy('_mixins.scss', './src/sass/utilities/_mixins.scss');
        }
    },

});

module.exports = BackboneApp;
