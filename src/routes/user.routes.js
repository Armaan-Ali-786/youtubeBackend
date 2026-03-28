import { Router } from "express";
import {
    registerUser,
    loginUser,
    logOutUser,
    refreshAccessToken,
    channelProfile,
    changeCurrentPassword,
    getCurrentUser,
    updateAccountDetails,
    updateAvatar,
    updateCoverImage,
    getWatchHistory
} from "../controllers/user.controller.js";
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
router.route('/change-password').post(verifyJWT, changeCurrentPassword);
router.route('/current-user').get(verifyJWT, getCurrentUser);

router.route('/update-details').patch(verifyJWT, updateAccountDetails);
router.route('/update-avatar').patch(verifyJWT, upload.single('avatar'), updateAvatar);
router.route('/update-coverimage').patch(verifyJWT, upload.single('coverImage'), updateCoverImage);

router.route('/channeldetail/:username').get(verifyJWT, channelProfile);
router.route('/watch-history').get(verifyJWT, getWatchHistory);

export default router;