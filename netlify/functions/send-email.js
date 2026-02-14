import nodemailer from "nodemailer";

const { GMAIL_USER, GMAIL_APP_PASSWORD } = process.env;

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 204,
      headers: cors(),
      body: ""
    };
  }

  try {
    const data = JSON.parse(event.body || "{}");
    const recipients = [data.email1, data.email2, data.email3].filter(Boolean);
    if (!recipients.length) {
      return json(400, { error: "At least one email address is required." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: GMAIL_USER,
        pass: GMAIL_APP_PASSWORD
      }
    });

    const subject = `Recruiting Report: ${data.prospectName || "Prospect"}`;
    const html = buildHtml(data);
    const text = buildText(data);

    await transporter.sendMail({
      from: `Recruiting Sheet <${GMAIL_USER}>`,
      to: recipients,
      subject,
      text,
      html
    });

    return json(200, { message: "Report sent" });
  } catch (err) {
    console.error(err);
    return json(500, { error: "Failed to send email" });
  }
};

const buildHtml = (data) => `
  <h2>In Game / Site Visit Recruiting Sheet</h2>
  <p><strong>Scout:</strong> ${data.scoutName || "-"}</p>
  <p><strong>Prospect:</strong> ${data.prospectName || "-"} (${data.prospectPosition || "-"})</p>
  <p><strong>School:</strong> ${data.prospectSchool || "-"}</p>
  <p><strong>Vitals:</strong> Jersey ${data.jersey || "-"} | Height ${data.height || "-"} | Weight ${data.weight || "-"} | GPA ${data.gpa || "-"}</p>
  <p><strong>Class Year:</strong> ${data.classYear || "-"} (${data.classType || "-"})</p>
  <p><strong>Visit Type:</strong> ${data.visitType || "-"}</p>
  <p><strong>Contact:</strong> ${data.contactPhone || "-"} / ${data.contactSocial || "-"}</p>
  <h3>Character Impression</h3>
  <p>${(data.characterImpression || "").replace(/\n/g, "<br>")}</p>
  <h3>Coach Evaluation / Comments</h3>
  <p>${(data.coachComments || "").replace(/\n/g, "<br>")}</p>
`;

const buildText = (data) => `Scout: ${data.scoutName}
Prospect: ${data.prospectName} (${data.prospectPosition})
School: ${data.prospectSchool}
Jersey: ${data.jersey}
Height: ${data.height}  Weight: ${data.weight}  GPA: ${data.gpa}
Class Year: ${data.classYear} (${data.classType})
Visit Type: ${data.visitType}
Contact: ${data.contactPhone} / ${data.contactSocial}

Character Impression:
${data.characterImpression}

Coach Comments:
${data.coachComments}
`;

const cors = () => ({
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST,OPTIONS"
});

const json = (statusCode, body) => ({
  statusCode,
  headers: cors(),
  body: JSON.stringify(body)
});
