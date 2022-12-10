import type { NextApiRequest, NextApiResponse } from 'next';
import {MongoClient} from 'mongodb'

interface ILoginDetails {
  username: string,
  password: string,
}

interface IUser {
  username: string,
  password: string,
  budgets: [],
  expenses: [],
}

const placeholderUser: IUser = {
  username: 'PLACEHOLDER',
  password: 'PLACEHOLDER',
  budgets: [],
  expenses: [],
}

const placeholderToken = {
  key: 'random_string'
}

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Get username and password from login form request
  const {username,password} = req.body as ILoginDetails;
  // Connect to MongoDB
  /* const mdbClient = await MongoClient.connect(
    process.env.DB_URI
  ); 
    const db = mdbClient.db();
  */
  // Authenticate password use decrypter
  // const decryptedPass = decrypter(password);

  //Query db for username and decryptedPass
  // db.query({username,decryptedPass})
    
  if (placeholderUser) {
    //create a token here => const token = 
    res.send(placeholderToken);
    //save this token when calling api/login and save it to localStorage
  } else {
    res.status(401);
  }
}