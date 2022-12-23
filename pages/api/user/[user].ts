import type { NextApiRequest, NextApiResponse } from 'next';
import mockDB from '../../../mockDB/mockDB';
import { filterByParam } from '../../../utils/genericHelperFuntions';

export default async function GET(  
  req: NextApiRequest,
  res: NextApiResponse,
  ) {
    // Get user from dynamic path
    const { user,method } = req.query;

    // Fetch user data from "DB"
    const users = mockDB;
    // Mock querying the "DB" for current user data
    const userData = filterByParam(users,'name',user);
};