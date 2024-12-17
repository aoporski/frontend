import React from "react";
import Navigation from "../components/Navigation";

export default function FavoritesLayout({ children }) {
  return (
    <section>
      <Navigation />
      <header>
        <h1>Ulubione Pokemony</h1>
      </header>
      <main>{children}</main>
    </section>
  );
}
