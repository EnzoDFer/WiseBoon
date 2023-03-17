import type { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession } from 'next-auth';
import mockDB from '../../../mockDB/mockDB';
import { filterByParam } from '../../../utils/utilFunctions';
import { IBudget, IExpense, IUser } from '../../../utils/interfaces';
import { authOptions } from '../auth/[...nextauth]';

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
    const userData = filterByParam(users,'name',user,'include')[0];
    res.json(
      {
        budgets: userData.budgets,
        expenses: userData.expenses
      }
    );
};

export async function POST(  
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req,res, authOptions);
  if (!session || !session.user) res.send({content:'This is a protected route.  Please log in.'})
  // Providing API authentication for user using session
  const data: IBudget | IExpense = req.body;

  if (data.hasOwnProperty('max')) { // Only budgets have 'max'
    mockDB.filter((user:IUser)=> {
      if (user.email===session!.user!.email) {
        return {
          ...user,
          budgets: [...user.budgets,data]
        }
      }
    })
  } else {
    mockDB.filter((user:IUser)=> {
      if (user.email===session!.user!.email) {
        return {
          ...user,
          budgets: [...user.expenses,data]
        }
      }
    })
  }
};

export async function PUT(  
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const session = await getServerSession(req,res, authOptions);
  if (!session || !session.user) res.send({content:'This is a protected route.  Please log in.'})
  // Providing API authentication for user using session
  const data: IBudget | IExpense = JSON.parse(req.body);

  if (data.hasOwnProperty('max')) { // Only budgets have 'max'
    mockDB.filter((user:IUser)=> {
      if (user.email===session!.user!.email) {
        return {
          ...user,
          budgets: user.budgets.filter((budget:IBudget)=>{
            if (budget.id===data.id) return data;
          })
        }
      }
    })
  } else { // Data is a budget
    mockDB.filter((user:IUser)=> {
      if (user.email===session!.user!.email) {
        return {
          ...user,
          expenses: user.expenses.filter((expense:IExpense)=>{
            if (expense.id === data.id) return data;
          })
        }
      }
    })
  }
};

export async function DELETE(  
  req: NextApiRequest,
  res: NextApiResponse,
  ) {
    const session = await getServerSession(req,res, authOptions);
    if (!session || !session.user) res.send({content:'This is a protected route.  Please log in.'})
    // Providing API authentication for user using session
    const userData: IUser = filterByParam(mockDB,'name',session?.user?.name,'include')[0]

    const data: IBudget | IExpense = req.body;
    if (data.hasOwnProperty('max')) { // Only budgets have 'max'
      const updatedUserData: IBudget[] = filterByParam(userData.budgets,'id',data.id,'exclude')
      mockDB.filter((user:IUser)=> {
        if (user.email===session!.user!.email) {
          return {
            ...user,
            budgets: updatedUserData
          }
        }
      })
    } else {
      const updatedUserData: IExpense[] = filterByParam(userData.expenses,'id',data.id,'exclude');
      mockDB.filter((user:IUser)=> {
        if (user.email===session!.user!.email) {
          return {
            ...user,
            expenses: updatedUserData
          }
        }
      })
    }
};