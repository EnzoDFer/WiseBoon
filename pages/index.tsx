import Head from 'next/head';
import styles from '../styles/Home.module.scss'
import Header from '../components/ui/Header/Header';
import { BudgetsProvider, useBudget } from '../contexts/BudgetsContext';
import CreateBudgetForm from '../components/ui/CreateBudgetForm/CreateBudgetForm';
import { useState } from 'react';
import ExpenseModal from '../components/ui/Modals/ExpenseModal';
import ExpenseListModal from '../components/ui/Modals/ExpenseListModal';
import IsAuthorized from '../components/providers/IsAuthorized';
import { IUserData } from '../utils/interfaces';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import mockDB from '../mockDB/mockDB';
import { filterByParam } from '../utils/utilFunctions';
import { SummaryCard } from '../components/ui/SummaryCard/SummaryCard';
import { ModalProvider } from '../contexts/ModalContext';
import BaseModal from '../components/ui/Modals/BaseModal/BaseModal';

export default function Home({userData}:{userData:IUserData}) {

  const {
    setCurrentBudget
  } = useBudget();

  const [budgetModalOpen, setBudgetModalOpen] = useState<boolean>(false);
  const [expenseModalOpen, setExpenseModalOpen] = useState<boolean>(false);
  const [expenseListModalOpen, setExpenseListModalOpen] = useState<boolean>(false);

  return (
    <BudgetsProvider userData={userData}>
      <ModalProvider>
        <IsAuthorized>
          <BaseModal/>
          <ExpenseModal
            opened={expenseModalOpen}
            setOpened={setExpenseModalOpen}
          />
          <ExpenseListModal
            opened={expenseListModalOpen}
            setOpened={setExpenseListModalOpen}
          />
          <main className={styles.main}>
            <Head>
              <title>WiseBoon</title>
              <meta name="description" content="Track your expenses and keep your budget tight!" />
              <link rel="icon" href="/favicon.ico" />
            </Head>
            <Header />
            <SummaryCard />
          </main>
        </IsAuthorized>
      </ModalProvider>
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
  // Get user from dynamic path
  // const { user } = req.query;
  // As we are mocking a DB query, we force this default user
  const user = 'Fake Namerson'; 
  // Fetch user data from "DB"
  const users = mockDB;
  // Mock querying the "DB" for current user data
  const userData = filterByParam(users,'name',user,'include')[0];

  return {
    props: {
      userData
    },
  }
}