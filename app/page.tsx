"use client";

import Image from "next/image";
import styles from "./page.module.scss";
import PricingCard from "./components/PricingCard";

export default function Home() {
  return (
    <main className={styles.main}>
      <Image
        src="logo.svg"
        data-testid="logo"
        alt="Logo"
        width={80}
        height={36}
        className={styles.logo}
      />
      <PricingCard />
    </main>
  );
}
