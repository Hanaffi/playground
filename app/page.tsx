"use client"

import Image from 'next/image'
import NumInputWithIcon from './components/NumInputWithIcon'
import styles from './page.module.scss'

export default function Home() {
  return (
    <main className={styles.main}>
      <NumInputWithIcon
        min="0"
        label="Price" Icon={<Image src="/icon-dollar.svg" alt="dollar" width={12} height={12} />} />
    </main>
  )
}
