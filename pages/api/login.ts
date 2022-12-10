import type { NextApiRequest, NextApiResponse } from 'next';
import {MongoClient} from 'mongodb'

interface ILoginDetails {
  username: string,
  password: string,
}


export default async function login(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Get username and password from login form request
  const {username,password} = req.body as ILoginDetails;
  // Connect to MongoDB
  const mdbClient = await MongoClient.connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@budget-tracker-users.kyjqupl.mongodb.net/?retryWrites=true&w=majority`
  );


}