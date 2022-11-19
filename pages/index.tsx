import Head from 'next/head';
import Container from '../components/ui/Container/Container';
import Button from '../components/ui/Button/Button';
import Header from '../components/ui/Header/Header';
import BudgetCard from '../components/ui/BudgetCard/BudgetCard';
import { BudgetsProvider, IBudget, useBudget } from '../contexts/BudgetsContext';

export default function Home() {
  const {budgets} = useBudget();

  return (
    <BudgetsProvider>
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
        {budgets.map((budget:IBudget, index: number)=>{
          <BudgetCard
            key={`card ${index}`}
            title={budget.name}
            current={200}
            maximum={budget.max}
          />
        })}
      </Container>
    </BudgetsProvider>
  )
}
