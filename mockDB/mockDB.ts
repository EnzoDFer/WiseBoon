import { IUser } from "../utils/interfaces";

import { v4 as uuidV4 } from "uuid";

const mockBudgetId: string = uuidV4();

const mockDB: IUser[] = [
  {
    name: 'Fake Namerson',
    email: 'FNamerson@domain.com',
    budgets: [
      {
        id: mockBudgetId,
        name: 'Sample Budget',
        max: 100
      }
    ],
    expenses: [
      {
        id: uuidV4(),
        budgetId: mockBudgetId,
        budgetName: 'Sample Budget',
        amount: 35,
        description: 'This is an example of an expense description.'
      }
    ]
  }
] 

export default mockDB;