import React from "react";

export const EmailTheme = ({ name, link }) => {
  const appName = process.env.APP_NAME;
  return (
    <div>
      <div class="">
        <h1>Dear {name},</h1>
        <p>
          You have successfully created an account at {appName} for your
          business.
        </p>

        <p style="padding:0;margin:0">
          To complete your registration, please do the following:
        </p>
        <ul>
          <li>
            <span class="il">Verify</span> your {appName} account by clicking
            the link below.
          </li>
          <li>
            Once you're logged in,please to enjoy our platform and you can share
            anyting about youre travel journey, or make reviews about destinaton
            in each other posts
          </li>
        </ul>

        <Button color="secondary">
          <a
            class="bgs"
            href={`${process.env.BASE_URL}/confirmation?confirmation_token=${token}`}
            target="_blank"
          >
            <span class="il">Verify</span> and complete registration
          </a>
        </Button>

        <p>
          For any questions or further information, please contact us at{" "}
          <a href="mailto:devcrew001@gmail.com" target="_blank">
            Devcrew001@gmail.com
          </a>
        </p>
        <p>
          Sincerely,
          <br />
          {appName}
        </p>
      </div>
    </div>
  );
};
