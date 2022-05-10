import { NextApiRequest, NextApiResponse } from "next";


export default (request: NextApiRequest, response: NextApiResponse) =>{
 const users = [
   {
     id:1,
     name: 'testA',
     age: 30
   },
   {
    id:2,
    name: 'testB',
    age: 20
  }
 ]

 return response.json(users);
}