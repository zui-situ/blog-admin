export interface stateTypes {
  tableData:Array<Object>,
  options:any,
  searchForm:{
    bindTitle: string | null,
    title: string | null,
    status: string | null
    bindStatus: string | null
    category: string | null,
    bindCategory: string | null
  }
}

export interface articleAddTypes {
  category:string,
  tag:string,
  title:string,
  content:string,
  description:string,
  cover:string
}

export interface optionListTypes {
  categoryList: any,
  tagList: any,
}
