export namespace AssessModel {
  export interface Assess {
    evaluate_id?: number
    evaluate_content: string
    evaluate_time: string
    evaluate_score: number
    parent_id: number
    openid: string
    business_id: number
    order_id: number
  }
}
