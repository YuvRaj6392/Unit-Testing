import express from "express";
import { z } from "zod";
export const app = express();
import { prisma } from "./db";

app.use(express.json());

const sumInput = z.object({
  a: z.number(),
  b: z.number(),
});

app.post("/sum", async (req, res) => {
  const parsedResponse = sumInput.safeParse(req.body);
  if (!parsedResponse.success) {
    return res.status(411).json({
      message: "Incorrect inputs",
    });
  }
  const a = parsedResponse.data.a;
  const b = parsedResponse.data.b;
  const result=a+b;
  if (a > 100000 || b > 100000) {
    return res.status(411).json({
      message: "Value too big",
    });
  }
  
  const response=await prisma.sum.create({
    data:{
      a:parsedResponse.data.a,
      b:parsedResponse.data.b,
      result
    }
  })

  return res.status(200).json({
    answer:result,
    id:response.id
  })

});
