import { z } from 'zod'
import { FundStatus, PerformancePeriod, PerformanceType } from './types'

const fundAmcSchema = z.object({
  last_upd_date: z.string(),
  unique_id: z.string(),
  name_th: z.string(),
  name_en: z.string(),
})

export const fundSchema = z.object({
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

const fundPerfSchema = z.object({
  last_upd_date: z.string(),
  class_abbr_name: z.string(),
  performance_type_desc: z.enum([
    PerformanceType.FUND_VOLA,
    PerformanceType.INDI_VOLA,
    PerformanceType.FUND_RETURN,
    PerformanceType.INDI_RETURN,
  ]),
  reference_period: z.enum([
    PerformancePeriod['3M'],
    PerformancePeriod['6M'],
    PerformancePeriod['1Y'],
    PerformancePeriod.YTD,
    PerformancePeriod['5Y'],
    PerformancePeriod['10Y'],
    PerformancePeriod.MAX,
  ]),
  performance_val: z.string(),
  as_of_date: z.string(),
})
export const fundPerfListSchema = z.array(fundPerfSchema)

export const fundPolicySchema = z.object({
  last_upd_date: z.string(),
  policy_desc: z.string(),
  investment_policy_desc: z.string(),
  management_style: z.string(),
})
