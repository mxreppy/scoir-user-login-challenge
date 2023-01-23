# User Login Code Challenge

Mikey Reppy 01-23-2023
mikey@aurantiumllc.com


Using a JavaScript framework of your choice (preferably [React](https://reactjs.org/)), create a simple login screen that allows users to enter their username and password and submit the login form to a backend process.

Create a backend (preferably using [GoLang](https://go.dev/), but not required) that processes the login information and checks if the username and password are valid. If the login information is valid, the backend should return a success message to the user. If the login information is invalid, the backend should return an error message to the user.

## How-To

The project is a monorepo with a client (react) and server (Django) component.  Each run independently (in separate terminals or processes via the framework supplied dev server for testing and development.  

### Server

#### Setup and database prep 

1.  Verify that Python 3.10 or greater is available.  The project will probably work fine with Python 3.7-3.9, but this has not been verified.  Development and testing used Python 3.10.8.  `python3 --version` will show the python version
1.  In the central project directory, create a virtual environment with `python3 -m venv venv`
1.  Activate the virtual environment with `source ./venv/bin/activate`
1.  Upgrade pip with `python3 -m pip install --upgrade pip`
1.  Install the python dependencies with `python3 -m pip install -r server/requirements.txt`
1.  cd into the `server` directory
2.  Run `./manage.py migrate` to setup Django's database.  Django is using sqlite for persistent storage.  A file will be created in the server's main folder called `db.sqlite3`

#### Users

1. We need at least one username / password persisted in the database for login.  For simplicity, we are using Django's builtin admin commands to add a superuser (which is perfectly valid for using Django's auth system to verify password hashes).  Future users can be more easily added in Django's admin interface which has a more friendly web form for adding and maintaining users.
3. run `./manage.py createsuperuser` and supply a username, email and password for the superuser

#### Running the server

Run `./manage.py runserver` to run Django's development web server on localhost port 8000

#### Testing the server

If a test user and server is set up correctly, the login method should be testable with curl (in another shell) or postman or any other :

``` 
$ curl --location --request POST 'http://localhost:8000/login/' \
>   --header 'Content-Type: application/x-www-form-urlencoded' \
>   --data-urlencode 'username=testuser' \
>   --data-urlencode 'password=test123@@!!'
ok <token or jwt here> 

$ curl --location --request POST 'http://localhost:8000/login/'   --header 'Content-Type: application/x-w--data-urlencode 'username=testuser'   --data-urlencode 'password=invalid'
invalid credentials 

```


### Client

1.  Verify that a nodejs install is available.  The app was built and tested under v18.13.0 (LTS), but it is a simple and straightforward app, and probably runs fine on a wide variety of node versions.
2. run `node --version` in a terminal to verify that node is available
3. run `npm --version` to check npm, this was built and run with npm version 9.3.1
2. cd into the `client` directory
3. run `npm install` to install the dependencies
3. run `npm start` to launch the development server on port 3000
4. The client is hardcoded to talk via CORS to the login api server running on `http://localhost:8000`
5. User feedback is only to the browser console at this time.




## Assumptions


Authentication and authorization systems need to have a very good way to store passwords as well as manage them.  Django offers this out of the box, and is a framework that I am familiar with, so I chose to use that.  I would be very interested in good ways to do this in golang, but in the time scope available for this challenge, that was not possible.  

The server project is nearly all the starter django template, with one view for login.  The logic is located in `server.backend.urls.login`.   The settings files were lightly customized to allow valid CORS requests to come in.   Although this is a minimally modified Django bootstrap install, it can easily scale to production for small and medium size volumes.  

I wanted to try out a simple react app with no origin node server dependencies, and as few third party libraries as possible.   This is not remotely production ready yet, as successful login will need work in concert with an app that has state and context.  But as a proof of concept it works.  There is a start to error handling but in a real system, error handling will need to be more robust.  Server errors and bad connections should be retried at least a few times before giving up.

The client will need work to go to production, this is little more than a POC.   At a minimum, components, component libraries and some kind of organized layout based on app design and function will be required.  I wanted to install as few third party libraries as possible, as well as elim I was also interested in seeing how looks like to do CORS based auth http request direct from the React "component", with just modern browser features.   `fetch` may not suit all clients of a web app system, and may need to be replaced with a library like axios. 



## Instructions
1. Click "Use this template" to create a copy of this repository in your personal github account.  
1. Update the README in your new repo with:
    * a `How-To` section containing any instructions needed to execute your program.
    * an `Assumptions` section containing documentation on any assumptions made while interpreting the requirements.
1. Send an email to Scoir (code_challenge@scoir.com) with a link to your newly created repo containing the completed exercise (preferably no later than one day before your next interview).

## Expectations
1. This exercise is meant to drive a conversation between you and Scoir's hiring team.  
1. Please invest only enough time needed to demonstrate your approach to problem solving and code design.  
1. Within reason, treat your solution as if it would become a production system.
1. If you have any questions, feel free to contact us at code_challenge@scoir.com

