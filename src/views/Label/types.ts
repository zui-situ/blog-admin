export interface formTypes {
  name:string
}

export interface stateTypes {
  tableData:Array<Object>,
  page:{
    pageNo:number,
    pageSize: number,
    total: number
  },
  searchForm:{
    bindName: string,
    bindStatus: string,
    name: string,
    status: string | null
  }
}
