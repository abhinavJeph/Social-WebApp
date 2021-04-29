const nodemailer = require("../config/nodemailer");

exports.newComment = (comment) => {
  console.log("Inside newComment mailer");
  console.log(comment);

  let htmlString = nodemailer.renderTemplate(
    { comment: comment },
    "/comments/new_comment.ejs"
  );

  nodemailer.trasnporter.sendMail(
    {
      from: "kevinelevenaa@gmail.com",
      to: comment.user.email,
      subject: "New Comment Published",
      html: htmlString,
    },
    (err, info) => {
      if (err) {
        console.log("error in sending mail", err);
        return;
      }
      console.log("message sent", info);
      return;
    }
  );
};
