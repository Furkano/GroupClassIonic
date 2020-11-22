export interface Filter{
    type: string;
    filters: {
  
      text?: string,
    
      page: number,
  
      offset?: number,
      sort?:number;
      Id?:number,
      startDate?:string,
      endDate?:string
      brands?:number[];
      category?:number;
      orderState?:number;
      advertisementState?:number;
    };
}