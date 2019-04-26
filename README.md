# Valgomat frontend

This application is used to give patients the possibility to 
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

The application can be accessed in localhost:3000

### File overview
The *components* folder contains all JavaScript files used to make the website.
The files are then split into small and large components, where the large
components are full pages, and the small components are building blocks
to make the large components.

The second main folder, is the *css* folder. This folder contains 
(almost) all the CSS files used in the project.

Finally, in our root folder, we have *App.js* and *App.css* which is 
the root of our application. Everything has to branch from these files.

#Valgomat backend
This application is used to give patients the possibility to 
answer a few questions, and in return, get a recommendation on which
treatment center they should pick.

###Get started
To run the application, you need to install the python 3. 
You can install it by:

* downloading it from their [website](https://www.python.org/downloads/)
* typing `brew install python3` on mac.
* typing `sudo apt install python3.X` on linux where X is version number.

To check if it works, type `python --version`.
If you want to run the application in a virtual environment, type
`pip install virtualenv` in the terminal to install a 
virtual environment library.

### Running the program
First you need to move to the root folder of the project.

Then follow the path according to your operating system:
#### Windows
To run the application without a virtual environment, simply type
`pip install -r requirements.py` to install the packages, 
then `python api.py` to run the application.

If you want to run the application in a virtual environment, 
make a new environment by typing `virtualenv -p python venv`.
To run the environment, type `source venv/Scripts/activate`.
Finally, type `pip install -r requirements.txt` to install packages 
and `python api.py` to run the application. 

The API runs at localhost:8020 by default.

To exit the environment, type `deactivate`.

#### Mac and linux
To run the application without a virtual environment, simply type
`pip3 install -r requirements.py` to install the packages, 
then `python api.py` to run the application.

If you want to run the application in a virtual environment, 
make a new environment by typing `virtualenv -p python3 venv`.
To run the environment, type `source venv/bin/activate`.
Finally, type `pip install -r requirements.txt` to install packages 
and `python api.py` to run the application.To exit the environment, 
type `deactivate`.

### File overview
*config_files* folder contains all our configuration files.
These files have strict setup and contains all the information needed 
to display quesitons to the frontend.

*storage* folder contains a backup list of all questions.

*api.py* file contains our API and everything needed to communicate
with our frontend.

*database.py* file has an overview of all our tables.

*sql_queries* file contains all the SQL queries we use when we 
communicate with the database.

*rbs.py* file contains our rule-based system and is used to recommend
treatment centers.

*utilities.py* contains a few converters and generator functions.
