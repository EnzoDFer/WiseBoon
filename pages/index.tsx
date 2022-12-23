import Head from 'next/head';
import Container from '../components/ui/Container/Container';
import Button from '../components/ui/Button/Button';
import Header from '../components/ui/Header/Header';
import BudgetCard from '../components/ui/BudgetCard/BudgetCard';
import { BudgetsProvider, useBudget } from '../contexts/BudgetsContext';
import BudgetModal from '../components/ui/Modals/BudgetModal';
import { useState } from 'react';
import ExpenseModal from '../components/ui/Modals/ExpenseModal';
import ExpenseListModal from '../components/ui/Modals/ExpenseListModal';
import { expenseArrayToCSV } from '../utils/csvUtil';
import IsAuthorized from '../components/providers/IsAuthorized';
import { IBudget, IUser, IUserData } from '../utils/interfaces';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { filterByParam } from '../utils/genericHelperFuntions';

export default function Home({userData}:{userData:IUserData}) {
  const {
    budgets,
    expenses,
    getBudgetExpenseTotal,
    setCurrentBudget
  } = useBudget();

  //testing *************
  console.log(userData);
  //delete above ********************

  const [budgetModalOpen, setBudgetModalOpen] = useState<boolean>(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState<boolean>(false);
  const [expenseListModalOpen, setExpenseListModalOpen] = useState<boolean>(false);

  return (
    <BudgetsProvider userData={userData}>
      <IsAuthorized>  
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
            <a
              href={'data:text/csv;charset=utf-8,'+encodeURI(expenseArrayToCSV(expenses))}
              download={`budgets_${new Date().toLocaleDateString()}.csv`}
            >
              Download as CSV
            </a>
          </Header>
          {budgets.map((budget:IBudget, index: number)=>{
            return <BudgetCard
              key={`card ${index}`}
              title={budget.name}
              id={budget.id}
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
      </IsAuthorized>
    </BudgetsProvider>
  )
}


// Fetch Budget and Expense data from (mock)DB using user
export const getServerSideProps: GetServerSideProps = async (context:GetServerSidePropsContext): Promise<{
  props: {userData: IUserData}}
> => {
  // Retrieve logged user from session
  const session = await getSession(context);
  // Check for user information
  if (!session || !session.user) {
    throw new Error('No session user found');
  }
  // Fetch current user data from back end api
  const res = await fetch(`${process.env.HOST_URL}/api/user/${session.user}`);
  const userData: IUserData = await res.json();

  return {
    props: {
      userData
    },
  }
}