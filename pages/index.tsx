import Head from 'next/head';
import Container from '../components/ui/Container/Container';
import Button from '../components/ui/Button/Button';
import Header from '../components/ui/Header/Header';
import BudgetCard from '../components/ui/BudgetCard/BudgetCard';

export default function Home() {
  return (
    <Container>
      <Head>
        <title>Budget Tracker</title>
        <meta name="description" content="Track your expenses and keep your budget tight!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header>  
        <h1>Budget</h1>
        <Button
          type='fill'
        >
          Add Budget
        </Button>
        <Button
          type='outline'
        >
          Add Expense
        </Button>
      </Header>
      <BudgetCard
        title={'title'}
        current={200}
        maximum={4000}
      />
    </Container>
  )
}
