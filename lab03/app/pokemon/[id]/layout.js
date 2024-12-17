"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";

export default function PokemonLayout({ children, params }) {
  const router = useRouter();

  const currentId = parseInt(params.id, 10);

  if (isNaN(currentId)) {
    return <div>Invalid Pokémon ID</div>;
  }

  const maxId = 10277;

  const goToPrevious = () => {
    const previousId = currentId - 1;
    if (previousId > 0) {
      router.push(`/pokemon/${previousId}`);
    }
  };

  const goToNext = () => {
    const nextId = currentId + 1;
    if (nextId <= maxId) {
      router.push(`/pokemon/${nextId}`);
    }
  };

  return (
    <section>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/pokemon">Pokémon</Link>
          </li>
          <li>{currentId}</li>
        </ul>
      </nav>

      <div>
        <button onClick={goToPrevious} disabled={currentId <= 1}>
          Previous
        </button>
        <button onClick={goToNext} disabled={currentId >= maxId}>
          Next
        </button>
      </div>

      <main>{children}</main>
    </section>
  );
}
