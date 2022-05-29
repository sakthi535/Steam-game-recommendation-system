# Steam-game-recommendation-system

Recommendation application based on Python/Flask and a Javascript/React Front-End with Material UI uses ANNOY algorithm to recommend user games based on user selected games. 

* Python 3.x
* Flask
* React

### Introduction

The application is made up of three main components:
- Frontend React Server;
- Backend Flask Server;
- Python Notebook for dataset generation;


### Install Backend Requirements

```sh
$ pip install -r requirements.txt
```

### Install Frontend Requirements

```sh
$ cd react-server
$ npm install
```

### Dataset Generation

```sh
Once pip requirements are installed, run python script in directory Dataset to generate required datasets. 
```

## Run the application 


### Start Back-End

```sh
$ cd flask-server
$ python manage.py runserver
```

### Start Front-End

```sh
$ cd react-server
$ npm start
```

Open your browser to ``` http://localhost:3000 ``` to view application

