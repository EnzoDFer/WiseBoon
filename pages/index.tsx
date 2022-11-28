import Head from 'next/head';
import Container from '../components/ui/Container/Container';
import Button from '../components/ui/Button/Button';
import Header from '../components/ui/Header/Header';
import BudgetCard from '../components/ui/BudgetCard/BudgetCard';
import { IBudget, useBudget } from '../contexts/BudgetsContext';
import BudgetModal from '../components/ui/Modals/BudgetModal';
import { useEffect, useState } from 'react';
import ExpenseModal from '../components/ui/Modals/ExpenseModal';
import ExpenseListModal from '../components/ui/Modals/ExpenseListModal';

export default function Home() {
  const {
    budgets,
    getBudgetExpenseTotal,
    setCurrentBudget
  } = useBudget();


  const [budgetModalOpen, setBudgetModalOpen] = useState<boolean>(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState<boolean>(false);
  const [expenseListModalOpen, setExpenseListModalOpen] = useState<boolean>(false);

  return (
    <>  
      <BudgetModal
        opened={budgetModalOpen}
        setOpened={setBudgetModalOpen}
      />
      <ExpenseModal
        opened={expenseModalOpen}
        setOpened={setExpenseModalOpen}
      />
      <ExpenseListModal
        opened={expenseListModalOpen}
        setOpened={setExpenseListModalOpen}
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
            onClick={()=>setBudgetModalOpen(!budgetModalOpen)}
          >
            Add Budget
          </Button>
          <Button
            variant='outline'
            onClick={()=>{
              setCurrentBudget(undefined);
              setExpenseModalOpen(!expenseModalOpen);
            }}
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
            createExpenseModal={()=>{
              setCurrentBudget(budget);
              setExpenseModalOpen(!expenseModalOpen);
            }}
            expenseListModal={()=>{
              setCurrentBudget(budget);
              setExpenseListModalOpen(!expenseListModalOpen);
            }}
          />
        })}
      </Container>
    </>
  )
}