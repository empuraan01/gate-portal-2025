export const isAuthenticated = (req, res, next) => {
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/google");
  }
  next();
};

export const isAuthorized = (req, res, next) => {
  const authorizedEmails = process.env.AUTHORIZED_EMAILS.split(",");
  
  if (!req.isAuthenticated()) {
    return res.redirect("/auth/google");
  }
  
  if (!authorizedEmails.includes(req.user.emails[0].value)) {
    return res.status(403).send("You are not authorized to access this page.");
  }
  
  next();
};

