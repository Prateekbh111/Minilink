# Minilink

Minilink is a web application that simplifies the process of sharing long and cumbersome URLs by transforming them into concise and shareable links. This project is built using a modern tech stack, ensuring a smooth user experience and efficient performance.
![Screenshot (463)](https://github.com/Prateekbh111/Minilink/assets/94775107/fc0164f5-28d4-4b90-a400-a9e312135f80)
![Screenshot (464)](https://github.com/Prateekbh111/Minilink/assets/94775107/d116980a-7dde-4222-94d2-5d7ebfbe0f57)
![Screenshot (461)](https://github.com/Prateekbh111/Minilink/assets/94775107/dcc6c125-585e-4a50-8524-16cbe085ac1a)
![Screenshot (462)](https://github.com/Prateekbh111/Minilink/assets/94775107/ece6637e-eae6-4c86-8761-d29cf1641af4)

## Features

- **URL Shortening:** Users can input a long URL, and the application will generate a shortened version that is easy to share and remember.
- **URL Analytics:** Track and analyze the performance of shortened URLs, including click statistics and referrer data.
- **Responsive Design:** The frontend is built using Tailwind CSS, ensuring a responsive and visually appealing experience across various devices and screen sizes.

## Technologies Used

- **Frontend:**
  React: A popular JavaScript library for building user interfaces.
  - Tailwind CSS: A utility-first CSS framework for rapid UI development.
  - Redux: A predictable state management library for managing application state.
  - Axios: A promise-based HTTP client for making API requests.
- **Backend:**
  - Node.js: A JavaScript runtime for building server-side applications.
  - Express: A minimalist and flexible Node.js web application framework.
  - MongoDB: A popular NoSQL database for storing and retrieving data.
  - Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js.
  - Cors: A middleware for handling Cross-Origin Resource Sharing (CORS) in Express.

## Getting Started

To get a local copy of the project up and running, follow these steps:

- **Clone the repository:**

  > git clone https://github.com/Prateekbh111/URL-Shortner

- **Navigate to the project directory:**

  > cd URL-Shortner

- **Install the required dependencies for the frontend and backend:**

  > cd frontend\
  > npm install\
  > cd ../backend\
  > npm install

- **Set up the environment variables for the backend:**

  - Create a .env file in the backend directory.
  - Define the necessary environment variables (PORT, DB_URI, DB_NAME).

- Start the development servers:

  - Start the frontend development server\

    > cd frontend\
    > npm run start

  - Start the backend development server (in a separate terminal)\
    > cd ../backend\
    > npm run dev
