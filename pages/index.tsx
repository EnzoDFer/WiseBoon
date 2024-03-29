import Head from 'next/head';
import styles from '../styles/Home.module.scss'
import Header from '../components/ui/Header/Header';
import { BudgetsProvider } from '../contexts/BudgetsContext';
import { IUserData } from '../utils/interfaces';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import mockDB from '../mockDB/mockDB';
import { filterByParam } from '../utils/utilFunctions';
import { SummaryCard } from '../components/ui/SummaryCard/SummaryCard';
import { ModalProvider } from '../contexts/ModalContext';
import BaseModal from '../components/ui/Modals/BaseModal/BaseModal';
import { SummaryTable } from '../components/ui/SummaryTable/SummaryTable';
import { randomUUID } from 'node:crypto';

export default function Home({userData}:{userData:IUserData}) {
  return (
    <BudgetsProvider userData={userData}>
      <ModalProvider>
        <BaseModal/>
        <main className={styles.main}>
          <Head>
            <title>WiseBoon</title>
            <meta name="description" content="Track your expenses and keep your budget tight!" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <Header />
          <SummaryCard />
          <SummaryTable />
        </main>
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
    const sampleID: string = randomUUID();
    return {
      props: {
        userData: {
          budgets: [
            {
              id: sampleID,
              name: 'Sample Budget',
              max: 100
            }
          ],
        expenses: [
          {
            id: randomUUID(),
            budgetId: sampleID,
            budgetName: 'Sample Budget',
            amount: 50,
            description: 'This is an example of an expense description.'
          }
        ]
        }
      },
    }
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