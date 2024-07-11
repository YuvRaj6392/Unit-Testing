import { describe, it, expect, vi } from "vitest";
import request from "supertest";
import { app } from "../index";
import { response } from "express";
import { prisma } from "../__mocks__/db";

vi.mock('../db')

describe('POST /sum', () => {
    it('Invalid input',async()=>{
      const response=await request(app).post('/sum').send([])
      expect(response.statusCode).toBe(411);
      expect(response.body.message).toBe('Incorrect inputs')
    })

    it('Too Big of a Number',async()=>{
      const response=await request(app).post('/sum').send({
        "a":0,
        "b":1000000
      })
      expect(response.statusCode).toBe(411);
      expect(response.body.message).toBe('Value too big')
    })

    it('sum of 1 and 1 is 2',async()=>{

      await prisma.sum.create.mockResolvedValue({
        id:1,
        a:1,
        b:2,
        result:3
      })

      vi.spyOn(prisma.sum,"create")
      
      const response=await request(app).post('/sum').send({
        "a":1,
        "b":2,
      })

      expect(prisma.sum.create).toHaveBeenCalledWith({
      data: {
        a: 1,
        b: 2,
        result: 3
        }
    })

       expect(response.statusCode).toBe(200)
       expect(response.body.answer).toBe(3)
       expect(response.body.id).toBe(1)
    })


   
})


// npm i supertest @types/supertest
// npm install express @types/express
//npm i -D vitest
//npm i -D vitest-mock-extended
