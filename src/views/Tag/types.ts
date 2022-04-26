export interface formTypes {
  name:string,
  icon:string,
  cover:string
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
