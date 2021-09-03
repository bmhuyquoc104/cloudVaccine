var AWS = require("aws-sdk");

const { SendEmailCommand } = require("@aws-sdk/client-ses");
const { sesClient } = require("./lib/sesClient.js");
const { initialState } = require("/Users/huynhchau/Desktop/cloudVaccine/src/Pages/Registration.js");

// Set the parameters

const { VerifyEmailIdentityCommand } = require("@aws-sdk/client-ses");

const params = { EmailAddress: "nguyendanghuynhchau15720@gmail.com" }; //ADDRESS@DOMAIN.EXT; e.g., name@example.com


const run = async () => {
try {
  const data = await sesClient.send(new VerifyEmailIdentityCommand(params));
  console.log("Success.", data);
  return data; // For unit tests.
} catch (err) {
  console.log("Error", err.stack);
}
};
run();

// Set the parameters
const params1 = {
  Destination: {
    /* required */
    CcAddresses: [
      /* more items */
    ],
    ToAddresses: [
      "nguyendanghuynhchau15720@gmail.com", //RECEIVER_ADDRESS
      /* more To-email addresses */
    ],
  },
  Message: {
    /* required */
    Body: {
      /* required */
      Html: {
        Charset: "UTF-8",
        Data: "HTML_FORMAT_BODY",
      },
      Text: {
        Charset: "UTF-8",
        Data: "TEXT_FORMAT_BODY",
      },
    },
    Subject: {
      Charset: "UTF-8",
      Data: "EMAIL_SUBJECT",
    },
  },
  Source: "nguyendanghuynhchau15720@gmail.com", // SENDER_ADDRESS
  ReplyToAddresses: [
    /* more items */
  ],
};


const run1 = async () => {
  try {
    const data = await sesClient.send(new SendEmailCommand(params1));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
};
run1();