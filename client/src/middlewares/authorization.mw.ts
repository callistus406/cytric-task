import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";

import constant from "../utils/constants";
import config from "../config/config";

function verifyJWT(req: any, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);
  const token = authHeader.split(" ")[1];
  if (!token)
    return res.status(401).json({ success: false, payload: "Invalid token" });

  jwt.verify(
    token,
    constant.jwt.accessTokenSecret,
    (err: Error | null, decoded: any): any => {
      if (err) {
        return res.status(403).json({
          success: false,
          payload: "Invalid session",
        });
      }
      req.user = decoded.user;

      next();
    }
  );
}

function ensureAuthenticated(req: any, res: Response, next: NextFunction) {
  const user = req.user;

  if (
   parseInt(user.role) === parseInt(config.roles.admin) ||
    parseInt(config.roles.investor)
  ) {
    return next();
  }

  return res.sendStatus(401);
}

// function isAdmin(req: any, res: Response, next: NextFunction) {

//   const user = req.user;
//   if (parseInt(user.role) === parseInt(config.roles.admin)) return next();
//   return res.status(403).json({
//     success: false,
//     payload: {
//       message: "You are not authorized to access this resource",
//       redirectUrl: "/",
//     },
//   });
// }
// function isInvestor(req: any, res: Response, next: NextFunction) {
//   const user = req.user;
//   if (parseInt(user.role)=== parseInt(config.roles.investor)) return next();
//   return res.status(403).json({
//     success: false,
//     payload: {
//       message: "You are not authorized to access this resource",
//       redirectUrl: "/",
//     },
//   });
// }

export default { verifyJWT, ensureAuthenticated };
