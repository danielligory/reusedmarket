Proof of Concept: Basic React Website

Proof of Concept: React Website with Node.js Backend for MongoDB Integration


**Environment variables:**

DB_USER: `marker`

DB_PASSWORD: `WiBht0IABlcxXQBO`


This proof of concept demonstrates a React website that communicates with a Node.js backend server, utilizing MongoDB as the database to display a list of products on the webpage.


Code Structure:
- The code comprises a React component for the frontend.
- `App.js` contains the main structure of the frontend, fetching and displaying product data.


Usage Instructions:
1. Ensure Node.js and MongoDB are installed: https://nodejs.org/ and https://www.mongodb.com/
2. Clone or download this repository to your local machine.
3. Navigate to both the frontend (React) and backend (Node.js) directories separately using the terminal or command prompt.
4. Run `npm i` in both directories to install the necessary dependencies.
5. Start the backend server by navigating to the backend directory and running `node server.js`.
7. Start the frontend by navigating to the frontend directory and running `npm start`.
8. Once the server is running, open a web browser and navigate to http://localhost:3000/ to view the list of products fetched from the MongoDB database.

Note: This proof of concept integrates React as the frontend and Node.js with MongoDB as the backend to display product data. Ensure both the frontend and backend servers are running concurrently to display the product list properly.


