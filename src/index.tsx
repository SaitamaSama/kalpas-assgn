import { injectGlobal } from "@emotion/css";
import { Global } from "@emotion/react";
import * as React from "react";
import { render } from "react-dom";
import { App } from "./bundles/root/app";

injectGlobal`
@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;500;800&display=swap');
`;

render(
  <>
    <Global
      styles={{
        body: {
          margin: 0,
          fontFamily: `'Manrope', 'Zen Kaku Gothic Antique', Inter, Poppins, sans-serif`,
          lineHeight: 1.5,
          letterSpacing: -0.5,
          backgroundColor: "#ebf2f7",
          fontWeight: 500,
          color: "#202020",
        },
      }}
    />
    <App />
  </>,
  document.getElementById("app"),
);
