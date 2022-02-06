# Weekend JQuery Server Side Calculator

## Description

_Duration: Weekend Project_

Directly above this is how long it took you to develop the project. Your project description goes here. What problem did you solve? How did you solve it? 

In this project, we tackled creating a calculator app that handled all calculations on the server side. The primary problems that needed solved were:

- How to capture the equation on the client side
- How to parse the data on the server based off many possible scenarios
- Provide user freedom to enter equation, but safegaurds in case user enters bad data
- Provide interactive list history

To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](www.heroku.com)

## Screen Shots

https://imgur.com/a/SepvMtL

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- Express
- body-parser

## Installation

How do you get your application up and running? This is a step by step list for how another developer could get this project up and running. The good target audience in terms of knowledge, would be a fellow Primer from another cohort being able to spin up this project. Note that you do not need a paragraph here to intro Installation. It should be step-by-step.

1. Fork from my existing github repo
1. Create a database named `your database name`,
2. The queries in the `tables.sql` file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on [Postgres](https://www.postgresql.org/download/), so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries, 
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage
How does someone use this application? Tell a user story here.

1. User clicks a sequence of numbers and buttons to enter an equation (just like an actual calculator :D)
2. User clicks '=' button to parse equation and send to server
3. If server successfully parses and equation is valid, the calculator appends result to DOM
4. User can also see full history of equations, and can interact to review the results


## Built With

- HTML 5
- CSS 3
- Javascript
- JQuery
- Express

## Acknowledgement
Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality!

## Support
If you have suggestions or issues, please email me at brant.mccarthy@me.com