import { Router } from "express";
import { registerUser, loginUser, logOutUser, refreshAccessToken, channelProfile } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1 // can take more if need
        }
    ]),
    registerUser
);

router.route('/login').post(loginUser);

//secured routes

router.route('/logout').post(verifyJWT, logOutUser);
router.route('/refresh-token').post(refreshAccessToken);

router.route('/channeldetail', channelProfile);

export default router;