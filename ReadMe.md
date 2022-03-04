# Koru_UX_Design_Test_Demo
## Test project for Koru UX Design

Objective : 

This project demonstrates the solution for problem statement give by **KORU UX Designs** given at 
http://koruindia.com/demosite/front-end/test.html.

All the modules and technology stack for this project is aligned toward the profile required tech skills.
### Technology Stack has following :
	1. Angular Js - 1.8.2 
	2. angular-ui-bootstrap
	3. Grunt - 0.4.1
	4. Express Local Server - 3.2.6
	
### Steps to build and run project :

1. `npm install`
2. `grunt serve`
3. `grunt serve`

#### NOTE - Project has no `watchers` for html changes, Livereload can be used.
#### To use live build, Change any file that you want to work on. But after that either add/remove a space to any css file and refresh webpage.
#### Or just run `grunt clean` and ` grunt serve` again.

### Files and Folders -Structure (Folders are mentioned in bold):
- **root**
	- _Gruntfile.js_
	- _package.json_
	- _ReadMe.md_
	- **Vendor**
		- **css** -This folder can be used as bucket for external .css libraries.
		- **js**  -This folder can be used as bucket for external .js libraries.
	- **tasks**
		- **dev-server.js**  - Used for running our local express serve.
		- **homepage.js**    - Used for merging and writing
	- **src**   - Contains our AJS app code
	 	- **app**
			- **Common**
				- _banner.html_ - **excluded**
			- **Home**
				- _alerts-modal.html_
				- _home.html_
			- **assets**
			- **css**
			- **js**
				- **Controllers**
				- **Directives**
				- **Services**
				- _app.js_
				- _app.routing.js_
			- _**index.html**_

#### New view modules can be added in **_src/app/<Module_Name>/*.html_**

##### At the same time, Entry in _Gruntfile.js_ copy task is required to copy modules to dev or dist

### Grunt Commands
1. `grunt clean` - Cleans the dev or dist generated copy of project
2. `grunt serve` - generates the dev version of project in **_root/dev_** folder also starts the local express serve at **http://localhost:8000/**
3. `grunt dist`  - generates stg/dist/prod copy of project in **_root/dist_** folder.





## _Happy Coding :-)_
## Email : mailto:janraorishikesh@gmail.com



