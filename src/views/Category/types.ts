export interface formTypes {
  name:string
  code:string
  cover:string
  icon:string
}

export interface stateTypes {
  tableData:Array<Object>,
  searchForm:{
    bindName: string,
    bindStatus: string,
    name: string,
    status: string | null
  }
}
