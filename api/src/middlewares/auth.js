import jwt from "jsonwebtoken";

export default function (req, res, next) {
  // Get token from header
  const token = req.header("x-auth-token");

  // Check if no token (unauthenticated request)
  if (!token) {
    return res
      .status(401)
      .json({ success: false, msg: "No token, authorization denied" });
  }

  // Verify token
  try {
    // jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, decoded) => {
    //   if (error) {
    //     return res.status(401).json({ msg: "Token is not valid" });
    //   } else {
    //     req.user = decoded;
    //     next();
    //   }
    // });
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
    req.user = decoded; // Now contains { userId, isAdmin }
    req.user.id = decoded.userId;
    next();
  } catch (err) {
    console.error("JWT Verification Failed:", err.message);
    return res
      .status(403)
      .json({ success: false, msg: "Invalid token, access denied" });
  }
}

// import jwt from "jsonwebtoken";

// export default function (req, res, next) {
//   // Get token from header
//   const token = req.header("x-auth-token");

//   // Check if no token (unauthenticated request)
//   if (!token) {
//     return res
//       .status(401)
//       .json({ success: false, msg: "No token, authorization denied" });
//   }

//   // Verify token
//   try {
//     // jwt.verify(token, process.env.JWT_ACCESS_SECRET, (error, decoded) => {
//     //   if (error) {
//     //     return res.status(401).json({ msg: "Token is not valid" });
//     //   } else {
//     //     req.user = decoded;
//     //     next();
//     //   }
//     // });
//     const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
//     req.user = decoded; // Now contains { userId, isAdmin }
//     next();
//   } catch (err) {
//     console.error("JWT Verification Failed:", err.message);
//     return res
//       .status(403)
//       .json({ success: false, msg: "Invalid token, access denied" });
//   }
// }
