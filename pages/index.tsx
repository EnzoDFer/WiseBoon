import Head from 'next/head';
import Container from '../components/ui/Container/Container';
import Button from '../components/ui/Button/Button';
import Header from '../components/ui/Header/Header';
import BudgetCard from '../components/ui/BudgetCard/BudgetCard';
import { BudgetsProvider, useBudget } from '../contexts/BudgetsContext';
import BudgetModal from '../components/ui/Modals/BudgetModal';
import { SetStateAction, useState } from 'react';
import ExpenseModal from '../components/ui/Modals/ExpenseModal';
import ExpenseListModal from '../components/ui/Modals/ExpenseListModal';
import { expenseArrayToCSV } from '../utils/csvUtil';
import IsAuthorized from '../components/providers/IsAuthorized';
import { IBudget, IUserData } from '../utils/interfaces';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import BudgetCardDisplay from '../components/ui/BudgetCardDisplay';
import CSVlink from '../components/ui/CSVlink';

export default function Home({userData}:{userData:IUserData}) {

  const {
    setCurrentBudget
  } = useBudget();

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
          
            <h1>BUDGETpal</h1>
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
            <CSVlink/>
          </Header>
          <BudgetCardDisplay 
            expenseModalState={expenseModalOpen} 
            expenseModalContol={setExpenseModalOpen} 
            expenseListModalState={expenseListModalOpen} 
            expenseListModalControl={setExpenseListModalOpen}            
          />
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
    const {res} = context;
    res.writeHead(302,{
      Location: '/login'
    });
    res.end();
  }
  // Fetch current user data from back end api
  const res = await fetch(`${process.env.HOST_URL}/api/user/${session!.user}`);
  const userData: IUserData = await res.json();

  return {
    props: {
      userData
    },
  }
}