import { Request, Response } from 'express';
import { parse } from 'url';
import { TableListItem, TableListParams, ETFTableListItem } from './data.d';

// mock tableListDataSource
let tableListDataSource: TableListItem[] = [];

let ETFtableListDataSource: ETFTableListItem[] = [];

ETFtableListDataSource = [
  {
    code: '001104',
    name: '华安新丝路主题股票',
    netWorth: '1.4040',
    dayGrowth: '0.2141',
    lastWeekGrowth: '1.9608',
    lastMonthGrowth: '3.6162',
    lastThreeMonthGrowth: '13.1346',
    lastSixMonthGrowth: '20.5150',
    lastYearGrowth: '62.8770',
    thisYearGrowth: '62.50',
  },
  {
    code: '160127',
    name: '南方新兴消费增长分级',
    netWorth: '1.2830',
    dayGrowth: '0.7855',
    lastWeekGrowth: '1.9063',
    lastMonthGrowth: '3.1351',
    lastThreeMonthGrowth: '10.0343',
    lastSixMonthGrowth: '14.4514',
    lastYearGrowth: '62.6198',
    thisYearGrowth: '56.0665',
  },
  {
    code: '001044',
    name: '嘉实新消费股票',
    netWorth: '1.5020',
    dayGrowth: '1.4865',
    lastWeekGrowth: '1.4179',
    lastMonthGrowth: '5.4035',
    lastThreeMonthGrowth: '8.1667',
    lastSixMonthGrowth: '8.0183',
    lastYearGrowth: '39.8956',
    thisYearGrowth: '35.3247',
  },
  {
    code: '001651',
    name: '工银新蓝筹股票',
    netWorth: '1.4930',
    dayGrowth: '0.6065',
    lastWeekGrowth: '1.1518',
    lastMonthGrowth: '2.7529',
    lastThreeMonthGrowth: '3.1077',
    lastSixMonthGrowth: '8.6608',
    lastYearGrowth: '29.4883',
    thisYearGrowth: '29.4883',
  },
  {
    code: '000083',
    name: '汇添富消费行业混合',
    netWorth: '4.5810',
    dayGrowth: '0.5267',
    lastWeekGrowth: '1.0143',
    lastMonthGrowth: '2.1405',
    lastThreeMonthGrowth: '7.6869',
    lastSixMonthGrowth: '13.3070',
    lastYearGrowth: '74.0502',
    thisYearGrowth: '67.2508',
  },
  {
    code: '001215',
    name: '博时沪港深优质企业基金A',
    netWorth: '1.0210',
    dayGrowth: '-0.3902',
    lastWeekGrowth: '0.8893',
    lastMonthGrowth: '0.2947',
    lastThreeMonthGrowth: '1.4911',
    lastSixMonthGrowth: '7.5869',
    lastYearGrowth: '42.3989',
    thisYearGrowth: '36.1333',
  },
  {
    code: '070032',
    name: '嘉实优化红利混合',
    netWorth: '1.72',
    dayGrowth: '0.4086',
    lastWeekGrowth: '0.7615',
    lastMonthGrowth: '2.4419',
    lastThreeMonthGrowth: '7.2319',
    lastSixMonthGrowth: '12.8609',
    lastYearGrowth: '48.9178',
    thisYearGrowth: '43.6926',
  },
  {
    code: '000190',
    name: '中银新回报灵活配置混合',
    netWorth: '1.4480',
    dayGrowth: '0.5556',
    lastWeekGrowth: '0.5556',
    lastMonthGrowth: '1.6854',
    lastThreeMonthGrowth: '4.3228',
    lastSixMonthGrowth: '8.0597',
    lastYearGrowth: '12.1612',
    thisYearGrowth: '12.5097',
  },
  {
    code: '002058',
    name: '中银新机遇混合C',
    netWorth: '1.0510',
    dayGrowth: '0',
    lastWeekGrowth: '0.3820',
    lastMonthGrowth: '0.9606',
    lastThreeMonthGrowth: '1.8107',
    lastSixMonthGrowth: '7.2476',
    lastYearGrowth: '12.5727',
    thisYearGrowth: '13.1447',
  },
  {
    code: '002057',
    name: '中银新机遇混合A',
    netWorth: '1.0520',
    dayGrowth: '0',
    lastWeekGrowth: '0.3817',
    lastMonthGrowth: '0.9596',
    lastThreeMonthGrowth: '1.9076',
    lastSixMonthGrowth: '7.3496',
    lastYearGrowth: '12.6751',
    thisYearGrowth: '13.2471',
  },
];

for (let i = 0; i < 8; i += 1) {
  tableListDataSource.push({
    key: i,
    disabled: i % 6 === 0,
    href: 'https://ant.design',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    name: `TradeCode ${i}`,
    title: `一个任务名称 ${i}`,
    owner: '曲丽丽',
    desc: '这是一段描述',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2017-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });
}

function getRule(req: Request, res: Response, u: string) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const params = (parse(url, true).query as unknown) as TableListParams;

  let dataSource = tableListDataSource;

  if (params.sorter) {
    const s = params.sorter.split('_');
    dataSource = dataSource.sort((prev, next) => {
      if (s[1] === 'descend') {
        return next[s[0]] - prev[s[0]];
      }
      return prev[s[0]] - next[s[0]];
    });
  }

  if (params.status) {
    const status = params.status.split(',');
    let filterDataSource: TableListItem[] = [];
    status.forEach((s: string) => {
      filterDataSource = filterDataSource.concat(
        dataSource.filter(item => {
          if (parseInt(`${item.status}`, 10) === parseInt(s.split('')[0], 10)) {
            return true;
          }
          return false;
        }),
      );
    });
    dataSource = filterDataSource;
  }

  if (params.name) {
    dataSource = dataSource.filter(data => data.name.indexOf(params.name) > -1);
  }

  let pageSize = 10;
  if (params.pageSize) {
    pageSize = parseInt(`${params.pageSize}`, 0);
  }

  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize,
      current: parseInt(`${params.currentPage}`, 10) || 1,
    },
  };

  return res.json(result);
}

function postRule(req: Request, res: Response, u: string, b: Request) {
  let url = u;
  if (!url || Object.prototype.toString.call(url) !== '[object String]') {
    // eslint-disable-next-line prefer-destructuring
    url = req.url;
  }

  const body = (b && b.body) || req.body;
  const { method, name, desc, key } = body;

  switch (method) {
    /* eslint no-case-declarations:0 */
    case 'delete':
      tableListDataSource = tableListDataSource.filter(item => key.indexOf(item.key) === -1);
      break;
    case 'post':
      const i = Math.ceil(Math.random() * 10000);
      tableListDataSource.unshift({
        key: i,
        href: 'https://ant.design',
        avatar: [
          'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
          'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
        ][i % 2],
        name: `TradeCode ${i}`,
        title: `一个任务名称 ${i}`,
        owner: '曲丽丽',
        desc,
        callNo: Math.floor(Math.random() * 1000),
        status: Math.floor(Math.random() * 10) % 2,
        updatedAt: new Date(),
        createdAt: new Date(),
        progress: Math.ceil(Math.random() * 100),
      });
      break;
    case 'update':
      tableListDataSource = tableListDataSource.map(item => {
        if (item.key === key) {
          return { ...item, desc, name };
        }
        return item;
      });
      break;
    default:
      break;
  }

  const result = {
    list: tableListDataSource,
    pagination: {
      total: tableListDataSource.length,
    },
  };

  return res.json(result);
}

function getETFRank(req: Request, res: Response) {
  const dataSource = ETFtableListDataSource;
  const result = {
    list: dataSource,
    pagination: {
      total: dataSource.length,
      pageSize: 10,
      current: 1,
    },
  };
  return res.json(result);
}

export default {
  'GET /api/rule': getRule,
  'POST /api/rule': postRule,
  'GET /api/rank': getETFRank,
};
