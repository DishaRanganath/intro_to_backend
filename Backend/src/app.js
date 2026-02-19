// Request hits the server
// express.json() parses body
// URL checked against /api/v1/users
// Request forwarded to userRoute
// Matching route found (/register)
// Controller runs
// Response sent back

import express from "express";
const app=express(); // an express app
app.use(express.json()); //middleware to parse json data from the request body

//routes to be used in the app
import userRoute from "./routes/user.route.js";

//routes declared here
app.use("/api/v1/users", userRoute);


//example of a route://localhost:4000/api/v1/users/register
export default app;
