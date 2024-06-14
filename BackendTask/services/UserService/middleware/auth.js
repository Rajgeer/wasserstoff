const config = require("../config");
const UserModel = require("../models/UserModel");
const jwt = require('jsonwebtoken');
class Authorization {
  static async userAuthProvider(req, res, next) {
    if (req.header("Authorization")) {
      const auth = req.header("Authorization");
      const parts = auth?.split(" ");
      const bearer = parts?.[0];
      const token = parts?.[1];
      if (bearer === "Bearer") {
        if (!token) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        try {
          const decoded = jwt.verify(token, config.SECRET_KEY);
          const user = await UserModel.findById(decoded.id)?.exec();
          if (!(user?.role === "user")) {
            return res
              .status(401)
              .json({ message: "Access denied. users only." });
          }
          next();
        } catch (error) {
          res.status(401).json({ message: "Invalid token" });
        }
      }
    }
  }
  static async adminAuthProvider(req, res, next) { 
    if (req.header("Authorization")) {
      const auth = req.header("Authorization");
      const parts = auth?.split(" ");
      const bearer = parts?.[0];
      const token = parts?.[1];
      if (bearer === "Bearer") {
        if (!token) {
          return res.status(401).json({ message: "Unauthorized" });
        }
        try {
          const decoded = jwt.verify(token, config.SECRET_KEY);
          const user = await UserModel.findById(decoded.id)?.exec();
          if (!(user?.role === "admin")) {
            return res
              .status(401)
              .json({ message: "Access denied. admin only." });
          }
          next();
        } catch (error) {
          res.status(401).json({ message: "Invalid token" });
        }
      }
    }
  }
}
module.exports = Authorization;
