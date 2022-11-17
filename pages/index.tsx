import Head from 'next/head'
import Container from '../components/ui/Container/Container'
import Header from '../components/ui/Header/Header'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <Container 
      className={styles.container}
    >
      <Head>
        <title>Budget Tracker</title>
        <meta name="description" content="Track your expenses and keep your budget tight!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>
        <h1>Budget</h1>
        <button>Add new budget</button>
        <button>Add new expense</button>
      </Header>
    </Container>
  )
}
