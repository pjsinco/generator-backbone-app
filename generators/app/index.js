'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var mkdirp = require('mkdirp');

var BackboneApp = yeoman.generators.Base.extend({

    promptUser: function() {

        var done = this.async();

        var prompts = [{
            name: 'appName',
            message: 'What is your app\'s name?',
        }, {
            type: 'confirm',
            name: 'addDemoSection',
            message: 'Would you like to generate a demo section?',
            default: true,
        }];

        this.prompt(prompts, function(props) {
            this.appName = props.appName;
            this.addDemoSection = props.addDemoSection;

            done();
        }.bind(this));

    },

    scaffoldFolders: function() {
        mkdirp.sync('./src');
        mkdirp.sync('./src/img');
        mkdirp.sync('./src/sass');
        mkdirp.sync('./src/sass/base');
        mkdirp.sync('./src/sass/layout');
        mkdirp.sync('./src/sass/modules');
        mkdirp.sync('./src/sass/utilities');
        mkdirp.sync('./src/js');
        mkdirp.sync('./src/js/models');
        mkdirp.sync('./src/js/views');
        mkdirp.sync('./src/js/collections');
        mkdirp.sync('./src/js/routers');
        mkdirp.sync('./src/js/util');
        mkdirp.sync('./src/js/vendor');
    },

    copyFiles: function () {

        var context = {
            appName: this.appName
        };

        this.fs.copyTpl(
            this.templatePath('_index.html'),
            this.destinationPath('index.html'),
            context
        );
        
        /**
         * Copy JS
         *
         */
        this.fs.copy(
            this.templatePath('_main.js'),
            this.destinationPath('./src/scripts/main.js')
        );

        /**
         * Copy Sass files
         *
         */
        this.fs.copy(
            this.templatePath('_base.scss'),
            this.destinationPath('./src/sass/base/_base.scss')
        );

        this.fs.copy(
            this.templatePath('_base_index.scss'),
            this.destinationPath('./src/sass/base/_index.scss')
        );

        this.fs.copy(
            this.templatePath('_layout_index.scss'),
            this.destinationPath('./src/sass/layout/_index.scss')
        );

        this.fs.copy(
            this.templatePath('_modules_index.scss'),
            this.destinationPath('./src/sass/modules/_index.scss')
        );

        this.fs.copy(
            this.templatePath('_utilities_index.scss'),
            this.destinationPath('./src/sass/utilities/_index.scss')
        );

        this.fs.copy(
            this.templatePath('_variables.scss'),
            this.destinationPath('./src/sass/utilities/_variables.scss')
        );

        this.fs.copy(
            this.templatePath('_style.scss'),
            this.destinationPath('./src/sass/style.scss')
        );


        /**
         * Copy package.json
         *
         */
        this.fs.copyTpl(
            this.templatePath('_package.json'),
            this.destinationPath('package.json'),
            context
        );

        /**
         * Copy gulpfile.js
         *
         */
        this.fs.copy(
            this.templatePath('_gulpfile.js'),
            this.destinationPath('gulpfile.js')
        );

        /**
         * Copy .gitignore
         *
         */
        this.fs.copy(
            this.templatePath('_gitignore'),
            this.destinationPath('.gitignore')
        );

        /**
         * Copy config.rb
         *
         */
//        this.fs.copy(
//            this.templatePath('_config.rb'),
//            this.destinationPath('config.rb')
//        );

        /**
         * Copy readme.md
         *
         */
        this.fs.copy(
            this.templatePath('_readme.md'),
            this.destinationPath('readme.md')
        );
    
    },
});

module.exports = BackboneApp;
