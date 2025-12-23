import jwt from "jsonwebtoken";

// Protect middleware
export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // FIX: must check "Bearer " with space
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "No token, unauthorized",
    });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = decoded; // { id, isAdmin }
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
};

// Admin middleware
export const admin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({
      success: false,
      message: "Admin only",
    });
  }
  next();
};
