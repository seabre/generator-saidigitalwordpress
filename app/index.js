'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var helpers = require('./helpers');
var saidigital = require('./saidigital');


var SaidigitalwordpressGenerator = module.exports = function SaidigitalwordpressGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    /*
    this.installDependencies({ skipInstall: true });
    */
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(SaidigitalwordpressGenerator, yeoman.generators.Base);

SaidigitalwordpressGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  saidigital.logo();
  console.log("Welcome to the saidigital wordpress project generator.");

  var prompts = [{
    name: 'projectName',
    message: 'What are we calling your project? (e.g. sai_digital)'
  },
  {
    name: 'projectPassword',
    message: 'What password should we set for the development database?'
  },
  {
    name: 'stagingHost',
    message: "What host should we set for the staging server? Leave empty if you don't know.",
    default: ''
  },
  {
    name: 'stagingUserName',
    message: "What user name should we set for the staging server? Leave empty if you don't know.",
    default: ''
  },
  {
    name: 'stagingPassword',
    message: "What user name password should we set for the staging server? Leave empty if you don't know.",
    default: ''
  },
  {
    name: 'stagingRemotePath',
    message: "What remote path should we set for the staging server? Leave empty if you don't know.",
    default: ''
  },
  {
    name: 'productionHost',
    message: "What host should we set for the production server? Leave empty if you don't know.",
    default: ''
  },
  {
    name: 'productionUserName',
    message: "What user name should we set for the production server? Leave empty if you don't know.",
    default: ''
  },
  {
    name: 'productionPassword',
    message: "What user name password should we set for the production server? Leave empty if you don't know.",
    default: ''
  },
  {
    name: 'productionRemotePath',
    message: "What remote path should we set for the production server? Leave empty if you don't know.",
    default: ''
  },
  ];

  this.prompt(prompts, function (props) {
    this.projectName = props.projectName;
    this.projectPassword = props.projectPassword;
    this.stagingHost = props.stagingHost;
    this.stagingUserName = props.stagingUserName;
    this.stagingPassword = props.stagingPassword;
    this.stagingRemotePath = props.stagingRemotePath;
    this.productionHost = props.productionHost;
    this.productionUserName = props.productionUserName;
    this.productionPassword = props.productionPassword;
    this.productionRemotePath = props.productionRemotePath;

    cb();
  }.bind(this));
};

SaidigitalwordpressGenerator.prototype.app = function app() {
  helpers.getLatestWordpress();

  helpers.gitInit();

  this.copy('gitignore', '.gitignore');
  this.copy('htaccess', '.htaccess');
  this.copy('vagrant_wordpress/Vagrantfile', 'Vagrantfile');
  this.mkdir('puppet');
  this.mkdir('puppet/manifests');
  this.directory('vagrant_wordpress/puppet/modules', 'puppet/modules');
  this.template('vagrant_wordpress/puppet/manifests/_site.pp', 'puppet/manifests/site.pp');
  this.template('_dandelion_staging.yml','dandelion_staging.yml');
  this.template('_dandelion.yml','dandelion.yml');
};

SaidigitalwordpressGenerator.prototype.projectfiles = function projectfiles() {
  /* Don't need this for now */
};
