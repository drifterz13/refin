import { z } from 'zod'
import { FundStatus } from './types'

const fundAmcSchema = z.object({
  last_upd_date: z.string(),
  unique_id: z.string(),
  name_th: z.string(),
  name_en: z.string(),
})

const fundSchema = z.object({
  last_upd_date: z.string(),
  proj_id: z.string(),
  regis_id: z.string(),
  regis_date: z.string(),
  cancel_date: z.string(),
  proj_name_th: z.string(),
  proj_name_en: z.string(),
  proj_abbr_name: z.string(),
  fund_status: z.enum([
    FundStatus.CA,
    FundStatus.EX,
    FundStatus.LI,
    FundStatus.RG,
    FundStatus.SE,
  ]),
  unique_id: z.string(),
  permit_us_investment: z.string(),
  invest_country_flag: z.string(),
})

export const fundAmcListSchema = z.array(fundAmcSchema)
export const fundListSchema = z.array(fundSchema)
