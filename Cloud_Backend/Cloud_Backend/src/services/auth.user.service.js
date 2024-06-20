import jwt from "jsonwebtoken";
import ErrorResponse from "../helpers/errorHandle.response.js";
import UserModel from "../models/user.model.js";
import { promisify } from "util";
import deviceController from "../controllers/device.controller.js";
import { decode } from "punycode";
import keyTokenModel from "../models/keyToken.model.js";

export const AuthenticationHeader = async (req, res, next) => {
  const userID = await req.get("CLIENT_ID");
  const accessToken = await req.get("ACCESS_TOKEN");
  // Check access Token
  if (!accessToken) {
    throw new ErrorResponse(
      "You are not logged in, Please login to get access"
    );
  }

  // verify token
  const decoded = await promisify(jwt.verify)(
    accessToken,
    "project-2-light-control-system"
  );
  console.log(decoded);

  // check if user exists
  const currentUser = await UserModel.findById(decoded.userId);
  if (!currentUser) {
    throw new ErrorResponse(
      "The Token belong to this user no longer exits yet"
    );
  }

  if(currentUser._id != userID){
    throw new ErrorResponse(`you are not belong to this page`,404);
  }

  // Check user
   
  next();
};
