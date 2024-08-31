import { z} from 'zod';
export const testSchema = z.object({
  answers: z.array(z.number()), 
})

export const testResponseSchema = z.object({
    answers: z.array(z.number()),
    id: z.number(),
    created: z.string() 
})

export type TestPayload = z.infer< typeof testSchema >
export type TestResponse = z.infer< typeof testResponseSchema >
export type TestParams = {
    page: number;
    page_size: number;
}
export type TestPaginatedResponse = {
    count:number;
    next:string;
    previous:string;
    results: TestResponse[];
}