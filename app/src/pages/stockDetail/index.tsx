import { Card, Form } from 'antd';
import React, { Component } from 'react';

import { Dispatch, Action } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

interface StockListProps extends FormComponentProps {
  dispatch: Dispatch<Action<'stockList/get'>>;
  loading: boolean;
}

interface StockListState {
  //   dataSource: TrackStockListData[];
}

class StockList extends Component<StockListProps, StockListState> {
  componentDidMount() {}

  render = () => (
    <PageHeaderWrapper>
      <Card bordered={false}>123</Card>
    </PageHeaderWrapper>
  );
}
export default Form.create<StockListProps>()(StockList);
