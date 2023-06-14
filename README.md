# ANIMAL HOUSE  

Uni project developed and mantained by sayonara team.

![Home Page](https://github.com/micheledinelli/AnimalHouse/blob/main/src/assets/home.png)

Here is what the home page look like

![News](https://github.com/micheledinelli/AnimalHouse/blob/main/src/assets/news.png)

And here are some news!

## SETUP .ENV FILE

The env file contains all the info used by the backend to handle database connection, password encryption and salting.

Change the DB variable in **.env** file (inside the backend folder). The mongodb uri format is specified at [mongodb string uri format](https://www.mongodb.com/docs/manual/reference/connection-string/).

It is also possible to change the SALT applied to user password encryption and the JWTPRIVATEKEY.

## INSTALL AND RUN

Fork / clone this repo.

Open a terminal and install the dependencies of the src code with

`npm install`.

Instead the dependencies of the backend have to be installed inside the directory of the backend. So change directory with 

`cd src/backend` 

and again 

`npm install`

Now you can run the server using

`node .\server.js` or `npm start`

Once the server is running just go back to the root directory of the project and start the react app with

`npm start`

## PROJECT DESCRIPTION

This project has been developed following this [specfication document](https://virtuale.unibo.it/pluginfile.php/1209586/mod_resource/content/0/ProgettoAnimalHouse-a.a.2122.pdf).

It's a university project which aims to validate the skills acquired during the university course "Web Technologies".

Animal House is divided in three main "views": the back office, the front office and the game page.

The back office is used by admin to check users info, reset their passwords or to delete their **personal data**. Admins can also prevent unwanted wall messages to appear, they can check them using the **wall manager** application.

The front office is the house of the **leaderboard**. Every signed in user can look at other people scores.  Front office hosts the **Wall page** where users can posts contents and images, and obviously scroll through other people posts. The last functionality offered by front office is the **Services page**, where users can book a service on a specific date, if available.

The game page hosts **3 games**: memory, hangman and a quiz game.
The main theme, as you can guess, is the animal world and its characters. Images, words, and questions are generated randomly with the help of external apis (or even self made ones). In the game page you can found the **news section**, where the latest animal news are retrieved from an api, to keep you updated on what's going on. There are also some **cool/funny videos** from youtube, give it a look!

### FUNCTIONAL DETAILS

animalHouse. uses React.js and bootstrap as css framework.
Some relevant dependecies are `react-toastify` to handle UI notifications and `axios`.
The backend uses `express` and the database with which it communicate is hosted by [mongo db atlas](https://cloud.mongodb.com/)


The project uses protected routes implemented using a component proxy which redirects the navigation requests. It's responsable to handle the validation of the authentication and/or authorization state. It works with the help of a singleton component `Auth.js` which stores and deletes the authentication infos from the local storage. The main idea was to implement the authentication using JWT technology, but we had little time to test it. Despite this, we left the infrastucture opened and prepared for JWT.

The routing inside the project is handled by the the component `BrowserRouter` from `react-router-dom`.

The 3 main "views" of the project use components written with React.

We never used react before and there has been a sort of evolution in our coding. We learned how to exploit React at his very best when the project was nearly done, but it has been a good opportunity to learn it.

## CONTACTS

We are **Awni Youssef**, **Filippo Brajucha** and **Michele Dinelli**, and we are concluding our studies in Information Science for management in Bologna.

Here are ours accademical contacts.

<youssefawni.hanna@studio.unibo.it> 0000948195

<michele.dinelli5@studio.unibo.it>  0000934209

<filippo.brajucha@studio.unibo.it>  0000920975
