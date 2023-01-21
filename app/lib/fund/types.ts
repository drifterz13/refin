export type FundAMC = {
  last_upd_date: string
  unique_id: string
  name_th: string
  name_en: string
}

export enum FundStatus {
  /** อนุมัติ(อยู่ระหว่าง Filing) */
  SE = 'SE',
  /** หมดเวลาเสนอขาย  */
  EX = 'EX',
  /** จดทะเบียน  */
  RG = 'RG',
  /** เลิกโครงการ */
  CA = 'CA',
  /** จดทะเบียนเลิก */
  LI = 'LI',
}

export type Fund = {
  last_upd_date: string
  proj_id: string
  regis_id: string
  regis_date: string
  cancel_date: string
  proj_name_th: string
  proj_name_en: string
  proj_abbr_name: string
  fund_status: FundStatus
  unique_id: string
  permit_us_investment: string
  invest_country_flag: string
}
