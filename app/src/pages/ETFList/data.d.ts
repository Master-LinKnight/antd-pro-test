export interface TableListItem {
  key: number;
  disabled?: boolean;
  href: string;
  avatar: string;
  name: string;
  title: string;
  owner: string;
  desc: string;
  callNo: number;
  status: number;
  updatedAt: Date;
  createdAt: Date;
  progress: number;
}

export interface TableListPagination {
  total: number;
  pageSize: number;
  current: number;
}

export interface TableListData {
  list: TableListItem[];
  pagination: Partial<TableListPagination>;
}

export interface TableListParams {
  sorter: string;
  status: string;
  name: string;
  pageSize: number;
  currentPage: number;
}

export interface ETFTableListParams {
  fundType: string[];
  sort: string;
  fundCompany: string[];
  fundGrade: string[];
  creatTimeLimit?: number;
  fundScale?: number;
  asc?: number;
  pageIndex?: number;
  pageSize?: number;
}

export interface ETFTableListItem {
  code: string; // 基金代码
  name: string; // 基金名称
  netWorth: string; // 当前基金单位净值
  dayGrowth: string; // 日涨幅,单位为百分比
  lastWeekGrowth: string; // 最近一周涨幅,单位为百分比
  lastMonthGrowth: string; // 最近一个月涨幅,单位为百分比
  lastThreeMonthGrowth: string; // 最近三个月涨幅,单位为百分比
  lastSixMonthGrowth: string; // 最近六个月涨幅,单位为百分比
  lastYearGrowth: string; // 最近一年涨幅,单位为百分比
  thisYearGrowth: string; // 今年的涨幅,单位为百分比
}
