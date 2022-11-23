import Head from 'next/head';
import Container from '../components/ui/Container/Container';
import Button from '../components/ui/Button/Button';
import Header from '../components/ui/Header/Header';
import BudgetCard from '../components/ui/BudgetCard/BudgetCard';
import { IBudget, useBudget } from '../contexts/BudgetsContext';
import BudgetModal from '../components/ui/Modals/BudgetModal';
import { useState } from 'react';

export default function Home() {
  const {
    budgets,
    getBudgetExpenseTotal,
    addExpense,
  } = useBudget();

  const [budgetModal, setBudgetModal] = useState<boolean>(false);

  return (
    <>  
      <BudgetModal
        opened={budgetModal}
        setOpened={setBudgetModal}
      />
      <Container>
        <Head>
          <title>Budget Tracker</title>
          <meta name="description" content="Track your expenses and keep your budget tight!" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Header>
          <h1>Budget</h1>
          <Button
            variant='fill'
            onClick={()=>setBudgetModal(!budgetModal)}
          >
            Add Budget
          </Button>
          <Button
            variant='outline'
            onClick={()=>addExpense({
              budgetId:budgets[0].id,
              amount: 50,
              description:'this is a test'
            })}
          >
            Add Expense
          </Button>
        </Header>
        {budgets.map((budget:IBudget, index: number)=>{
          return <BudgetCard
            key={`card ${index}`}
            title={budget.name}
            current={getBudgetExpenseTotal(budget.id)}
            maximum={budget.max}
          />
        })}
      </Container>
    </>
  )
}