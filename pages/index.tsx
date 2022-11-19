import Head from 'next/head';
import Container from '../components/ui/Container/Container';
import Button from '../components/ui/Button/Button';
import Header from '../components/ui/Header/Header';
import BudgetCard from '../components/ui/BudgetCard/BudgetCard';
import { IBudget, useBudget } from '../contexts/BudgetsContext';

export default function Home() {
  const {
    budgets,
    getBudgetExpenseTotal,
    addBudget,
    addExpense,
  } = useBudget();

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
          onClick={()=>addBudget({
            name:'test',
            max:1000
          })}
        >
          Add Budget
        </Button>
        <Button
          type='outline'
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
  )
}