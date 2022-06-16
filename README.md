# ANIMAL HOUSE  

Uni project developed and mantained by sayonara team.

![Preview of the project](https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif)

## SETUP .ENV FILE

The env file contains all the info used by the backend to handle database connection, password encryption and salting.

Change the DB variable in **.env** file (inside the backend folder). The mongodb uri format is specified at [mongodb string uri format](https://www.mongodb.com/docs/manual/reference/connection-string/).

It is also possible to change the SALT applied to user password encryption and the JWTPRIVATEKEY.

## RUN

Fork / clone this repo.

Given the following project structure

![Project Structure](src\assets\project-structure.png "Project Structure")

Open a terminal and install the dependencies of the src code with

> `npm install`.

Instead the dependencies of the backend have to be installed inside the directory of the backend. So change directory with 

>`cd src/backend` 

and type again 

>`npm install`

Now you can run the server using

> `node .\server.js`

Once the server is running just go back to the root directory of the project 

> `cd..`

and start the react app with

> `npm start`

## CONTACTS

<youssefawni.hanna@studio.unibo.it>
<michele.dinelli5@studio.unibo.it>
<filippo.brajucha@studio.unibo.it>




