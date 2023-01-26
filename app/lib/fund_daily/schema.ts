import { z } from 'zod'

const fundDividendHistoySchema = z.object({
  last_upd_date: z.string(),
  book_close_date: z.string(),
  dividend_date: z.string(),
  dividend_value: z.number(),
})

export const fundDividendHistoriesSchema = z.array(fundDividendHistoySchema)
