import { Card, Form, Table } from 'antd';
import React, { Component } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { StateType } from './model';
import { ColumnProps } from 'antd/es/table';
import { connect } from 'dva';
import router from 'umi/router';
import { TrackStockData, TrackStockListData, StockData } from './data.d';
import style from './style.less';

interface StockListProps extends FormComponentProps {
  dispatch: Dispatch<Action<'stockList/get'>>;
  loading: boolean;
  stockList: StateType;
}

interface StockListState {
  //   dataSource: TrackStockListData[];
}

interface TableColumnProps extends ColumnProps<TrackStockListData> {
  needTotal?: boolean;
  total?: number;
}

@connect(
  ({
    stockList,
    loading,
  }: {
    stockList: StateType;
    loading: {
      models: {
        [key: string]: boolean;
      };
    };
  }) => ({
    stockList,
    loading: loading.models.stockList,
  }),
)
class StockList extends Component<StockListProps, StockListState> {
  columns: TableColumnProps[] = [
    {
      title: '股票代码',
      dataIndex: 'stockId',
      render: (val: string) => <span style={{ color: '#333' }}>{val}</span>,
    },
    {
      title: '名称',
      dataIndex: 'stockName',
      render: (val: string) => <span style={{ color: '#333' }}>{val}</span>,
    },
    {
      title: '当前价格',
      dataIndex: 'stockPrice',
    },
    {
      title: '振幅',
      dataIndex: 'stockSwing',
    },
    {
      title: '涨跌',
      dataIndex: 'stockIncrease',
    },
    {
      title: '市盈率',
      dataIndex: 'stockPE',
    },
    {
      title: '市净率',
      dataIndex: 'stockPB',
    },
    {
      title: '',
      dataIndex: '',
      key: 'x',
      render: () => <a style={{ color: '#F4B042' }}>详情</a>,
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'stockList/get',
      payload: {},
    });
  }

  renderDataSource = (data: TrackStockData[]): TrackStockListData[] => {
    const dataSource: TrackStockListData[] = [];
    data.forEach((ts: TrackStockData) => {
      if (ts.stocks) {
        ts.stocks.forEach((s: StockData) => {
          dataSource.push({
            key: ts.key,
            stockId: ts.stockId,
            stockName: ts.stockName,
            isUp10Times: ts.isUp10Times,
            isUp20Times: ts.isUp20Times,
            stockPrice: s.stockPrice,
            stockPrePrice: s.stockPrePrice,
            stockOpenPrice: s.stockOpenPrice,
            stockTopPrice: s.stockTopPrice,
            stockBottomPrice: s.stockBottomPrice,
            stockSwing: s.stockSwing,
            stockIncrease: s.stockIncrease,
            stockIncreaseRate: s.stockIncreaseRate,
            stockTurnoverVolume: s.stockTurnoverVolume,
            stockTurnover: s.stockTurnover,
            stockTurnoverRate: s.stockTurnoverRate,
            stockPE: s.stockPE,
            stockPB: s.stockPB,
            freeFloatMarketCapitalisation: s.freeFloatMarketCapitalisation,
            marketCapitalisation: s.marketCapitalisation,
            marketDate: s.marketDate,
          });
        });
      }
    });

    return dataSource;
  };

  renderTextColor = (number: number) => {
    if (number > 0) {
      return style['row-red-col'];
    }
    if (number === 0) {
      return style['row-grey-col'];
    }
    return style['row-green-col'];
  };

  render = () => {
    const {
      stockList: { data },
      loading,
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>
          <Table
            dataSource={this.renderDataSource(data)}
            columns={this.columns}
            loading={loading}
            pagination={{ pageSize: data.length }}
            size="small"
            rowClassName={(record: TrackStockListData) => {
              let className = '';
              if (record.stockIncrease) className = this.renderTextColor(record.stockIncrease);
              return className;
            }}
            onRow={(record: TrackStockListData) => ({
              onClick: () => {
                router.push({
                  pathname: '/stock/stocklist/stockDetail',
                  query: { stockId: record.stockId, stockName: record.stockName },
                });
              },
            })}
          />
        </Card>
      </PageHeaderWrapper>
    );
  };
}
export default Form.create<StockListProps>()(StockList);
