import type { NextApiRequest, NextApiResponse } from 'next';

export default async function GET(  
  req: NextApiRequest,
  res: NextApiResponse,
  ) {
    // Get user from dynamic path
    const { user,method } = req.query;
    // Retrieve jwt from req
    // const jwt = req.headers.authorization

    // Verify jwt is valid before returning data
    /* jwt.verify((err)=>{
      if (err) return res.status(401)
      
      // Since jwt is valid, this must be an authenticated user.
      // So we can pull or manipulate user data with user id from path

      switch (method){
        case 'GET':
          const userData = db.query(find(user))
          //insert error handler if no user
          return res.json(userData)
          break;
      }
      
    })*/
};