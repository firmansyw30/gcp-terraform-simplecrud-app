export const ensureAuthenticated = (req, res, next) => {
    if (req.session && req.session.userId) {
      return next();
    } else {
      res.status(401).json({ message: "Anda harus login terlebih dahulu" });
    }
  };
