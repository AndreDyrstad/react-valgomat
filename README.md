# Valgomat frontend

This appliaction is used to give patients the possibility to 
answer a few questions, and in return, get a recommendation on which
treatment center they should pick.

###Get started
To run the application, you need to have *npm* and *node* installed.
You can install them by:

* installing them through their [website](https://nodejs.org/en/)
* running `sudo apt-get install nodejs` on linux
* running `brew install node` on mac.

To check if they are properly installed, type `node -v` and `npm -v`

### Running the program
Now that you have npm up and running, 
you have to install all packages needed to run the application.
This can be done by typing `npm install` 
in the terminal when you are in the root folder of the project.
After all the packages are downloaded, simply type `npm start` 
to run the application.

### File overview
The *components* folder contains all JavaScript files used to make the website.
The files are then split into small and large components, where the large
components are full pages, and the small components are building blocks
to make the large components.

The second main folder, is the *css* folder. This folder contains 
(almost) all the CSS files used in the project.

Finally, in our root folder, we have *App.js* and *App.css* which is 
the root of our application. Everything has to branch from these files.
