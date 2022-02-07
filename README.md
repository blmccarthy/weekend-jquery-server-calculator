# Weekend JQuery Server Side Calculator

## Description

_Duration: Weekend Project_

Directly above this is how long it took you to develop the project. Your project description goes here. What problem did you solve? How did you solve it? 

In this project, we tackled creating a calculator app that handled all calculations on the server side. The primary problems that needed solved were:

- How to capture the equation on the client side
- How to parse the data on the server based off many possible scenarios
- Provide user freedom to enter equation, but safegaurds in case user enters bad data
- Provide interactive list history

To see the fully functional site, please visit: [DEPLOYED VERSION OF APP](https://prime-server-calculator.herokuapp.com/)


## Screen Shots

https://imgur.com/a/SepvMtL


### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- Express
- body-parser


## Installation

1. Fork from my existing github repo 
    - https://github.com/blmccarthy/weekend-jquery-server-calculator/tree/stretch
1. Ensure npm is installed:
    - in Terminal: `npm install --yes`
2. Activate server in terminal: `npm start`
3. Within browser, go to: localhost:5000


## Usage

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