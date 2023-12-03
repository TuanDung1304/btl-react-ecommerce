export interface CreateVoucherForm {
  name: string
  code: string
  amount: number
  maxUser: number
  startedAt: Date
  finishedAt: Date
}
