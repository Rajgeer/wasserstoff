// const config = require("../config");
const jwt = require("jsonwebtoken");
exports.verifyToken = (req, res, next) => {
  const userId = req?.query?.userId;
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
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        if (!(userId === decoded.id)) {
          return res
            .status(401)
            .json({ message: "This user is not authorized" });
        }
        next();
      } catch (error) {
        res.status(401).json({ message: "Invalid token" });
      }
    }
  }
};
