import { Card, Form, Table } from 'antd';
import React, { Component } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { StateType } from './model';
import { ColumnProps } from 'antd/es/table';
import { connect } from 'dva';

import { TrackStockData, TrackStockListData, StockData } from './data.d';

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
  //   constructor(props: StockListProps) {
  //     super(props);
  //     this.state = {
  //       dataSource: [],
  //     };
  //   }
  columns: TableColumnProps[] = [
    {
      title: '股票代码',
      dataIndex: 'stockId',
    },
    {
      title: '名称',
      dataIndex: 'stockName',
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
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'stockList/get',
      payload: {
        dateKey: '20200103',
      },
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
    // try {
    //   this.setState({
    //     dataSource: dataSource,
    //   });
    // } catch (e) {
    //   console.log(e);
    // }

    return dataSource;
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
          />
        </Card>
      </PageHeaderWrapper>
    );
  };
}
export default Form.create<StockListProps>()(StockList);
