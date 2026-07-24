// import express from "express";

// import {
//   registerUser,
//   loginUser,
//   getProfile,
// } from "../controllers/auth.controller.js";


// import {
//   protect,
// } from "../middlewares/auth.middleware.js";

// const router = express.Router();

// router.post(
//   "/register",
//   registerUser
// );

// router.post(
//   "/login",
//   loginUser
// );


// router.get(
//   "/profile",
//   protect,
//   getProfile
// );



// export default router;



// ================================



import express from "express";

import {
    signup,
    login,
    getProfile,
    adminLogin
} from "../controllers/auth.controller.js";

import { protect  } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);

router.post("/login", login);

router.post("/admin/login", adminLogin);

router.get("/me", protect , getProfile);

export default router;