# generator-jhipster-basic-auth
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url]
> JHipster module, Adds stateless basic authentication support

# Introduction

This is a [JHipster](http://jhipster.github.io/) module, that is meant to be used in a JHipster application.

This module configures stateless basic auth security on the path ```/api_basic/**``` that is used in parallel of the existing security.
Before using this module, you should be aware of the security implications : the user/password will be sent on each request so an HTTPS/TLS reverse proxy shall be used in production for this path.
Also if your API is to be consumed by both web and non-web applications, you should consider using OAuth2 mechanism as it gives you more control on which application uses your API and it is fully supported by JHipster.

# Prerequisites

As this is a [JHipster](http://jhipster.github.io/) module, we expect you have JHipster and its related tools already installed:

- [Installing JHipster](https://jhipster.github.io/installation.html)

# Installation

To install this module:

```bash
npm install -g generator-jhipster-basic-auth
```

To update this module:
```bash
npm update -g generator-jhipster-basic-auth
```

# Usage

Run the module on a JHipster generated application:
```
yo jhipster-basic-auth
```
Options :
* ```--force``` if you don't want questions to be asked.
* ```--clean``` to uninstall the module instead of installing.

This will configure basic auth security on path ```/api_basic/**```. Existing entity resources will be added to this path (eg. ```GET /api_basic/foos```).

You can now easily use curl to test your endpoints:
```
curl -X GET "http://admin:admin@localhost:8080/api_basic/foos"
```

# License

Apache-2.0 © [Christophe Bornet]

[npm-image]: https://img.shields.io/npm/v/generator-jhipster-basic-auth.svg
[npm-url]: https://npmjs.org/package/generator-jhipster-basic-auth
[travis-image]: https://travis-ci.org/cbornet/generator-jhipster-basic-auth.svg?branch=master
[travis-url]: https://travis-ci.org/cbornet/generator-jhipster-basic-auth
[daviddm-image]: https://david-dm.org/cbornet/generator-jhipster-basic-auth.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/cbornet/generator-jhipster-module
