## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Setup](#setup)

## General info
This project is simple football ranking tracker.
	
## Technologies
Project is created with:
* Nestjs version: 8.3.1
* typescript version: 4.5.5

	
## Setup
To run this project, install it locally using npm:

```
$ npm install
$ npm start
```
Note with local installation we need to have mysql database up and running

## Setup with docker

To run this project, install it locally using docker-compose:

```
$ docker-compose up -d
```

## Docmentation:
We use [swagger](https://swagger.io/)  for documentation, for localy:
````
http://localhost:3000/api
````
## TODO

- [ ] Implement of e2e test
- [ ] Add validation
- [ ] Support pagination
- [ ] Add support for CSV
