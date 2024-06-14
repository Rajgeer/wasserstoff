const config = require("../config");
const jwt = require('jsonwebtoken');
class Authorization {
  static Provider(req, res, next) {
    console.log("authorization provider", {req});
    const userId = req?.query?.userId;
    if (req.header("authorization")) {
      console.log('Hello header')
        const auth = req.header("authorization");
        const parts = auth?.split(" ");
        const bearer = parts?.[0];
        const token = parts?.[1];
        if (bearer === "Bearer") {
          if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
          }
          try {
            const decoded = jwt.verify(token, config.SECRET_KEY);
            if(!(userId=== decoded.id)){
              return res.status(401).json({ message: "This user is not authorized" });
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
