# Guest House Booking Application

This is a user-friendly web application, made using the MERN stack, to help property owners manage their guest houses. It offers an easy way for users to view and book rooms. Users can see room details and photos, check room availability on a calendar, and choose their dates for booking. For property owners, they can create, update, and remove room listings, set the minimum, maximum booking period, a rent amount for each day, and add room photos. It's a hassle-free solution for guest house booking.

## User Roles
There are two distinct user roles within the system:  
    1. House Owner: They can create / edit / delete rooms and their details, set the minimum, maximum booking period. Can set a rent amount for each day with photos. 
    2. Customer: They can browse all rooms available for booking, view details of each room, and their photos. They can see an availability calendar and can choose the dates to book.

## Features
- Responsive
- Real time application
- Secure authentication
  
### House owner:
- Can register for an account with an email address and a mobile number.
- Create / edit / delete rooms and their details.
- Set the minimum and maximum booking period.
- Set a rent amount for each day.
- Upload photos.

### Customers
- Can register for an account with an email address and a mobile number.
- They can browse all rooms available for booking.
- View details of each room, and their photos.
- See an availability calendar.
- Choose the dates and book.

## Technologies
- Reactjs
- Nodejs
- Expressjs
- MongoDB Atlas
- MaterialUI
- Tailwindcss
- Axios
- Framer-motion

## Login

- House owner can Create Account
- User can Create Account  

## Deployment

#### 1. Clone the Reposotiry
```bash
git clone https://github.com/ijaas2003/Guest-House-Management.git
```

#### 2. Go to the project directory and install dependencies for both the client and server
```bash
cd client
npm install
```
```bash
cd server
npm install
```

#### 3. Install the Dependencies of server

Dependencies info :
 - Express : Create an API very easily for the server
 - Mongoose : Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment. Mongoose supports Node.js.
 - Cors : CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
 - Nodemon : Nodemon is a tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.
 - Bcrypt : A library to help you hash passwords.
 - CookieParser : This is a middleware which parses cookies attached to the client request object.
 - Express-rate-limit : This module is used to limit the client request for security purpose.
 - JsonWebToken : This is used to authenticate the user.


```bash
npm i express cors mongoose nodemon bcrypt sib-api-v3-sdk
```
#### 4. Install the Dependencies of client
 - MaterialUI : Material UI is an open-source React component library that implements Google's Material Design
 - Validator : It provides the default validation functions.
 - MaterialUI Icons : Which provides a collection of popular icon libraries (such as Font Awesome, Material Design, and Octicons) that can be easily used in a React application.
 - React Router Dom : The react-router-dom package contains bindings for using React Router in web applications.
 - Tailwindcss : This is a css library and also have prebuilt components to speed up the development.
 - Axios : This is a module to make a API call to the backend very easily.
 
```bash
npm i @mui/material @mui/styled-engine-sc styled-components @mui/icons-material @fontsource/roboto @mui/material @emotion/react @emotion/styled @material-ui/core validator react-router-dom axios
```
#### 5. Install the Tailwindcss
This is a css library and also have prebuilt components to speed up the development.

```bash
npm install -D tailwindcss
npx tailwindcss init
```
To add the directives of to your css

```bash
@tailwind base;
@tailwind components;
@tailwind utilities;
```

#### 6. Start the both, server and client
To start the project client
```bash
npm start
```
To start the server
```bash
npm run Devstart
```


## Some of Screenshots
![Landing](https://github.com/ijaas2003/Guest-House-Management/assets/88438635/803762f3-af57-4bb5-9ce1-e4c34103bcb6)
![View Booking](https://github.com/ijaas2003/Guest-House-Management/assets/88438635/1b1eb0e3-f123-47f9-8ca0-f14805c36a5e)
![Login](https://github.com/ijaas2003/Guest-House-Management/assets/88438635/c5963a0f-9b11-4232-8e1a-9f43c7dc3e7d)
![Home](https://github.com/ijaas2003/Guest-House-Management/assets/88438635/1dbe17f2-4c42-455f-94ea-f1a2e0d411ec)
![Error on already booked house](https://github.com/ijaas2003/Guest-House-Management/assets/88438635/bfe2aabe-a5ea-44be-8f67-08fa674f3e04)
![Payment](https://github.com/ijaas2003/Guest-House-Management/assets/88438635/58e04495-b522-45e1-9387-7e83868e4cbf)
![Edit Details](https://github.com/ijaas2003/Guest-House-Management/assets/88438635/90ae2c34-71a4-4187-a570-7ed10524a104)
![Add House](https://github.com/ijaas2003/Guest-House-Management/assets/88438635/7aa175b4-05ae-46e8-92a6-c710cc976d55)
