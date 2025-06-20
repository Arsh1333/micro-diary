import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  const token = authHeader.split(" ")[1];
  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    // console.log("Verified User:", verify);
    req.user = verify;
    // console.log(req.user);
    next();
  } catch (err) {
    console.log(err);
  }
};

export { verifyToken };
