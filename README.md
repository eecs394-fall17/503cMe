# Givistry - The Registry for Giving

<img align="right" width="300" height="111"
     title="Givistry Logo" src="./src/assets/imgs/givistry_bannerLOGO_lg.png">

Givistry allows users to browse non-profit organizations by the category of donations they are looking for, and make direct donations to them. Potential donors can select specific items to donate to the organizations.

## SYSTEM REQUIREMENTS

- Python 2.5+ (2.7.3 recommended)
- Tested on Windows and OS X
- Node.js, npm, ionic-cli

## INSTALLATION

Instructions are given in Unix command-line syntax. Use similar commands in Windows.

Clone repository to local folder

```bash
$ git clone https://github.com/eecs394-fall17/503cMe.git
```

Go to the newly cloned project

```
$ cd 503cMe/
```

Install all necessary packages

```
$ npm install
```

## FIREBASE
 
To use firebase in the current app, first setup a database on at Firebase. Fill in app.components.ts with the authentication keys and other credentials to link your own firebase database to the app.

## RUNNING

To run the application in local browser

```
$ ionic serve
```

To run the application on devices

```
$ ionic cordova run android --device
or
$ ionic cordova run ios --device
```
 
## DEPLOYMENT
 
 To deploy the app, create an account at Ionic Pro first. Then you can link the current app to Ionic Pro.
 
 ```
 $ cd 503cMe/
 $ ionic link
 
 to push current work to master branch of ionic app
 $ git push ionic master
 ```
 
## UNFINISHED WORK
 
- Direct payments in-app
- Separate interface for organizations
- Profile page
- Messaging medium between organizations and donors
