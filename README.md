[![Coverage Status](https://coveralls.io/repos/github/okafor-chidimma/propertyprolite/badge.svg?branch=develop)](https://coveralls.io/github/okafor-chidimma/propertyprolite?branch=develop) [![Maintainability](https://api.codeclimate.com/v1/badges/9f5cc7fa1ed5a3feb90a/maintainability)](https://codeclimate.com/github/okafor-chidimma/propertyprolite/maintainability)


# propertyprolite
Secure and Efficient online Application for all things property. Rent, buy or sale inclusive

# Begin Your Journey
Ensure you have the following applications installed and running on your Personal Computer
* [NPM](https://www.npmjs.com/)
* [Node](https://nodejs.org)
* [Git](https://git-scm.com/)

Follow the steps listed below to get started
 1. Clone the project repository
 - On your PC, open your terminal and navigate into the folder that you want the project repo to be in
 - execute the following command to clone the repo

  			`git clone https://github.com/okafor-chidimma/propertyprolite.git`

 - Next, navigate into the project root directory and execute the following command   to install project dependencies

             `npm install`

 - Execute the following command to create a .env file with the necessary environmental variable for the project

              `touch .env && cp .env.example .env`

 - Create postgres databases for test and development and add their connection urls to their respective keys in your .env file
 - Execute the following to migrate database tables and seed with mock data

              `npm run migrate && npm run seed`

 - To drop databases tables at any time Execute

              `npm run migrate:undo`

 - To start the development server run

               `npm run dev-start`

## To Run Tests

To run the automated tests, 

- Navigate to the project root directory and execute the following command in your terminal to set the environment, migrate tables and insert data into your test db

                ` npm run prep-test`

- Execute the following command to initiate the test
                
                ` npm run test`


## Built With

The following core packages where used in building this application

* [Express](https://expressjs.com/) - The web framework used
* [Babel](https://babeljs.io/) - Javascript transpiler
* [Express-validator](https://express-validator.github.io/docs/) - Middleware used for request validation and sanitization
* [Bcrypt](https://www.npmjs.com/package/bcrypt) - Password hashing function
* [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) - Used for generating and verify tokens for authentication and authorization
* [Swagger](https://swagger.io/) - Used for API documentation
* [Pg](https://node-postgres.com/) - Node Postgres Client
* [Mocha](https://mochajs.org/) - Test framework
* [Chai](https://www.chaijs.com/) - Assertion library used for tests
* [Eslint](https://eslint.org/) - Javascript linting utility
* [Multer](https://www.npmjs.com/package/multer) - Used for file upload
* [Cloudinary](https://cloudinary.com/) - Used to store the files when uploaded


# Features Available
There are two main roles associated with this application
 1. **User** : A normal user with basic priviledges
 2. **Agent**: Has normal user's access as well as additional features.
 
 What the different roles can do respctively is listed below:
 
  **A User can**
  - Sign up for an account
  - Sign in to the application
  - View all the properties placed on advert
  - View all properties of the same type
  - View a specific property advert
  - Flag any advert as fraudulent. 
  
 
 **An Agent can**
 - Post Property Adverts
 - Update adverts specific to the agnet
 - Mark a property advert as sold
 - Delete a property advert
 
 # Additional Features
 - A User can Reset Password
 - A User can flag/report an AD as Fraudulent
 - A google map to display the location for the red flag Intervention
 - An Agent can add multiple pictures to a posted AD
 
 
 ## Links Related to the Application
 * [User Interface](https://okafor-chidimma.github.io/propertyprolite/) - The UI for this application can be accessed here
 
 * [Documentation](https://propertyprolitechidimma-okafor.herokuapp.com/api-docs/) - The Api Endpoints Documentation can be accessed here
 
 * [Pivotal-Tracker](https://www.pivotaltracker.com/n/projects/2356939) - For Project Management
  
 # Designed By
 - Okafor Chidimma

 ## License

 - This project is licensed under the ISC License


## PS
- Application still in development Stage
