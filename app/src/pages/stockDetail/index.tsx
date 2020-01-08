import { Card, Form } from 'antd';
import React, { Component } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface StockDetailProps extends FormComponentProps {
  location: any;
  dispatch: Dispatch<Action<'stockList/get'>>;
  loading: boolean;
}

interface StockDetailState {
  //   dataSource: TrackStockDetailData[];
}

class StockDetail extends Component<StockDetailProps, StockDetailState> {
  componentDidMount() {
    // console.log(this.props);
  }

  render = () => {
    const {
      location: {
        query: { stockId, stockName },
      },
    } = this.props;
    return (
      <PageHeaderWrapper>
        <Card bordered={false}>{stockId}</Card>
        <Card bordered={false}>{stockName}</Card>
      </PageHeaderWrapper>
    );
  };
}
export default Form.create<StockDetailProps>()(StockDetail);
