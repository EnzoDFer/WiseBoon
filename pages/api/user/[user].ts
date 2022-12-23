import type { NextApiRequest, NextApiResponse } from 'next';
import mockDB from '../../../mockDB/mockDB';
import { filterByParam } from '../../../utils/genericHelperFuntions';

export default async function GET(  
  req: NextApiRequest,
  res: NextApiResponse,
  ) {
    // Get user from dynamic path
    // const { user } = req.query;
    // As we are mocking a DB query, we force this default user
    const user = 'Fake Namerson'; 
    // Fetch user data from "DB"
    const users = mockDB;
    // Mock querying the "DB" for current user data
    const userData = filterByParam(users,'name',user)[0];
    res.json(
      {
        budgets: userData.budgets,
        expenses: userData.expenses
      }
    );
};