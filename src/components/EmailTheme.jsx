import { Button } from "@nextui-org/react";
import React from "react";

export const EmailTheme = ({ name, token }) => {
  const appName = process.env.APP_NAME;
  return (
    <div>
      <div>
        <h1>Dear {name},</h1>
        <p>
          You have successfully created an account at {appName} for your
          business.
        </p>

        <p>To complete your registration, please do the following:</p>
        <ul>
          <li>
            <span className="">Verify</span> your {appName} account by clicking
            the link below.
          </li>
          <li>
            Once you're logged in,please to enjoy our platform and you can share
            anyting about youre travel journey, or make reviews about destinaton
            in each other posts
          </li>
        </ul>

        <button>
          <a
            className=""
            href={`${process.env.BASE_URL}/confirmation?confirmation_token=${token}`}
            target="_blank"
          >
            <span className="">Verify</span> and complete registration
          </a>
        </button>

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
