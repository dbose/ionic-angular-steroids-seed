# Ionic + AngularJS + Steroids

Based on a discussion on the Ionic forum thread ([http://forum.ionicframework.com/t/created-a-seed-for-ionic-angular-appgyver/628](http://forum.ionicframework.com/t/created-a-seed-for-ionic-angular-appgyver/628)), here is the unified seed project. This inherit the fantastic workflow of Steroids (minus any performance optimization, that can be included later as a cordova plugin) and robust AngularJS constructs from ionic.

##	File/Directory Explanations

### Gruntfile.js

Grunt file for Steroids make.

### dist

This is where Steroids finally deploys cordova-compliant web folder

### hooks

This is specific to cordova CLI and and its workflow. More on this at [DevGirl's Blog](http://devgirl.org/2013/11/12/three-hooks-your-cordovaphonegap-project-needs/)


### merges
Use the `merges` directory just like you would in a vanilla Cordova project.

Example structure:

	`<your app dir>/merges/android/index.html`
	`<your app dir>/merges/ios/index.html`

This will generate 

	`dist/index.android.html` (android) and 
	`dist/index.html` (ios) 
	
files during Steroids `make`. Read more about the `.android.` extension here: 
[http://guides.appgyver.com/steroids/guides/android/android-extension/](http://guides.appgyver.com/steroids/guides/android/android-extension/)

Merge files will overwrite existing files when building to the `dist` directory.

For example: `www/index.html` would be overwritten by `merges/ios/index.html` and `www/index.android.html` would be overwritten by `merges/android/index.html`.
	
	
### platforms, plugins

Standard cordova folders


### scss

Inonic uses `gulpfile.js` for any SCSS customization over ionic css framework defaults. However it's manual step to do `gulp sass` to compile the SCSS to CSS. Steroids already has a task for this - `steroids-compile-sass` (located at node_modules/grunt-steroids/tasks/steroids-compile-sass.coffee). However, the default task only looks at `app/` and `www/` subfolders. To automate ionic CSS customization we have modified the `steroids-compile-sass`  task to look into this `scss/` folder. `ionic.app.scss` looks like this

	/*	
	$light:                           #fff !default;
	$stable:                          #f8f8f8 !default;
	$positive:                        #4a87ee !default;
	$calm:                            #43cee6 !default;
	$balanced:                        #66cc33 !default;
	$energized:                       #f0b840 !default;
	$assertive:                       #ef4e3a !default;
	$royal:                           #8a6de9 !default;
	$dark:                            #444 !default;
	*/

	//$stable: #8a6343;

	// The path for our ionicons font files, relative to the built CSS in www/css
	$ionicons-font-path: "../lib/ionic/fonts" !default;

	// Include all of Ionic
	@import "www/lib/ionic/scss/ionic";

If you need to override any variables (like `$stable`), it can easily be done here and steroids would detect that and rebuild the CSS.
	

### www

Root folder for a cordova project. This is pretty much copied from ionic starter project (tab one for example), with few modification in the `www/index.html`

#### Changed how ionic.css is rendered

	<link href="css/ionic.css" rel="stylesheet">
	
#### Serving cordova.js from localhost to ensure the correct 
	<script src="http://localhost/cordova.js"></script>
	
