import { z } from 'zod'

export const fundAmcSchema = z.object({
  last_upd_date: z.string(),
  unique_id: z.string(),
  name_th: z.string(),
  name_en: z.string(),
})

export const allFundAmcSchema = z.array(fundAmcSchema)
