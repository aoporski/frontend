import React from "react";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <h1>Pokedex</h1>

        {children}
      </body>
    </html>
  );
}
