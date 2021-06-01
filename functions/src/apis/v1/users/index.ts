import * as express from "express";
import { validateGetUser, getUserValidationRules, getUser } from './getUser'
import { validateAddNewUser, addNewUserValidationRules, addNewUser } from './addNewUser'
import { updateUserValidationRules, validateUpdateUser, updateUser } from './updateUser'
import { validateDeleteUser, deleteUserValidationRules, deleteUser } from './deleteUser'
import { validateFollowUnfollowUser, followUnfollowUserValidationRules, followUnfollowUser } from './followUnfollowUser'

const userRouter = express.Router()

// @ts-ignore
userRouter.get("/user/:userId", getUserValidationRules, validateGetUser, getUser)
// @ts-ignore
userRouter.post("/user", addNewUserValidationRules, validateAddNewUser, addNewUser)
// @ts-ignore
userRouter.patch("/user", updateUserValidationRules, validateUpdateUser, updateUser)
// @ts-ignore
userRouter.delete("/user", deleteUserValidationRules, validateDeleteUser, deleteUser)

// @ts-ignore
userRouter.post('/user/:taskType(follow|unfollow)', followUnfollowUserValidationRules, validateFollowUnfollowUser, followUnfollowUser)

export default userRouter