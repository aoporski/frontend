"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navigation() {
  const router = useRouter();

  return (
    <nav>
      <ul>
        <li>
          <Link href="/pokemon">Pokemon List</Link>
        </li>
        <li>
          <Link href="/favorites">Favorites</Link>
        </li>
      </ul>
    </nav>
  );
}
