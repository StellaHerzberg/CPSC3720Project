// Controller handles all client-facing operations (retrieving available events and processing 
// ticket purchases. Connects to the client module layer for database access and returns structures
// JSON responsees to the routes.

// NEED TO MODIFY, COPIED FROM PROVIDED CONTROLLER TEMPLATE
// CLIENT CONTROLLER

// const { getEvents } = require('../models/clientModel').default;
// const listEvents = (req, res) => {
// const events = getEvents();
// res.json(events);
// };


// module.exports = { listEvents };


// backend/admin-service/controllers/adminController.js
//something wrong with insert
// const { insertDataIntoDatabase, connectToDatabase } = require('../models/clientModel');

// const { getEvents, purchaseTicket } = require('../models/clientModel');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { connectToDatabase, queryFullDatabase, createDatabaseTable, addUser, getUser, verifyPassword } = require('../models/uaModel.js');

// Constants used for jwt
const EXPIRATION_VAL = "30m";
const JWT_VAL = "waffle-house";

// Handles request to retrieve events from database and returns as JSON response
// Params: req - the request object
// Params: res - response object to sent retrieved event 
// Return: None because responds with server status
// Side Effects: Calls getEvents() and sends JSON
const userRegister = async (req, res) => {
    try {
        const {email, password} = req.body;

        if (!email || !password) {
            return res.status(400).json({message: "Email and password required to register for TigerTix."})
        }

        const alreadyExists = await getUser(email);
        if (alreadyExists) {
            return res.status(400).json({message: "You've already registered for TigerTix with the entered credentials!"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await addUser(email, hashedPassword); // maybe need to await?

        return res.status(201).json({message: "You've successfully registered for TigerTix!"});

    } catch (err) {
        console.error("Error detected in userRegister: ", err);
        return res.status(500).json({message: "Server error"})
    }
};

// Handles request to purchase ticket for an event. Function extracts event ID, calls purchaseTicket() to decrement,
// and returns the number of tickets remaining.
// Params: req - request object to contain the ID of event being purchased
// Params: res - response object to send success or error
// Return: None because responds directly with status
// Side Effects: Modifies "numTickets" in database for event and sends JSON response.
const userLogin = async (req, res) => {

    try {
        const {email, password} = req.body;

        const user = await verifyPassword(email, password);

        if (!user) {
            return res.status(400).json({ message: "You entered an invalid email or password." });
        }

        const token = jwt.sign(
            {id: user.id, email: user.email},
            JWT_VAL,
            {expiresIn : EXPIRATION_VAL}
        );

        res.cookie("userAuthenticationToken", token, {
            httpOnly: true,
            secure: false,
            maxAge: 30 * 60 * 1000
        });

        return res.json({message: "TigerTix login successful!"});




    } catch (err) {
        console.error("Login error: ", err);
        return res.status(500).json({message: "Server error with logging in"});
    }
  
};

const userLogout = async (req, res) => {
    res.clearCookie("userAuthenticationToken");
    res.json({message: "Logged out of TigerTix successfully!"});
};

const verifyUsingJWT = async (req, res, next) => {
    const token = req.cookies?.userAuthenticationToken;

    if (!token) {
        return res.status(401).json({message: "Action is not currently allowed via failed authentication."});
    }

    try {
        const decodedUser = jwt.verify(token, JWT_VAL);
        req.user = decodedUser;
        return next();

    } catch (err) {
        return res.status(401).json({message: "User's JWT token either invalid or expired."});
    }

};

module.exports = { userRegister, userLogin, userLogout, verifyUsingJWT }