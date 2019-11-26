import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { Card, Statistic, Button, Spin, Icon, Row, Col, Empty } from 'antd';
import TransactionValue from '../transaction/TransactionValue';

import DashboardService from './dashboard.service';
import TransactionService from '../transaction/transaction.service';

import moment from 'moment';

const COLOR = {
  GREEN: '#3f8600',
  RED: '#cf1322'
};

export default function Dashboard() {
  const [summary, setSummary] = useState({});
  const [loadingSummary, setLoadingSummary] = useState(false);

  const [lastTransactions, setLastTransactions] = useState([]);
  const [loadingLastTransactions, setLoadingLastTransactions] = useState(false);

  const history = useHistory();

  useEffect(() => {
    fetchSummary();
    fetchLastTransactions();
  }, []);

  const fetchSummary = () => {
    setLoadingSummary(true);

    DashboardService.getSummary()
      .then(response => {
        setSummary(response.data);
      })
      .finally(() => setLoadingSummary(false));
  };
  const fetchLastTransactions = () => {
    setLoadingLastTransactions(true);

    TransactionService.findAll({
      sortField: 'createdAt',
      sortOrder: 'descend',
      limit: 3
    })
      .then(response => {
        setLastTransactions(response.data.content);
      })
      .finally(() => setLoadingLastTransactions(false));
  };

  return (
    <div className="p-2">
      <Row className="mb-2" gutter={16}>
        <Col span={8}>
          <Spin spinning={loadingSummary}>
            <Card>
              <Statistic
                title="Saldo"
                value={summary.saldo}
                precision={2}
                valueStyle={{
                  color: summary.saldo > 0 ? COLOR.GREEN : COLOR.RED
                }}
                prefix={
                  summary.saldo > 0 ? (
                    <Icon type="arrow-up" />
                  ) : (
                    <Icon type="arrow-down" />
                  )
                }
              />
            </Card>
          </Spin>
        </Col>
        <Col span={8}>
          <Spin spinning={loadingSummary}>
            <Card>
              <Statistic
                title="Ganhos"
                value={summary.ganhos}
                precision={2}
                valueStyle={{ color: COLOR.GREEN }}
                prefix={<Icon type="arrow-up" />}
              />
            </Card>
          </Spin>
        </Col>
        <Col span={8}>
          <Spin spinning={loadingSummary}>
            <Card>
              <Statistic
                title="Despesas"
                value={summary.despesas}
                precision={2}
                valueStyle={{ color: COLOR.RED }}
                prefix={<Icon type="arrow-down" />}
              />
            </Card>
          </Spin>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={8}>
          <Spin spinning={loadingLastTransactions}>
            <Card>
              <h4 className="mb-1">Últimas transações</h4>
              {lastTransactions.length ? (
                lastTransactions.map(transaction => (
                  <Row
                    key={transaction.id}
                    className="mb-1"
                    type="flex"
                    justify="space-between"
                  >
                    <Col span={14}>
                      <div>{transaction.nome}</div>
                      <div className="muted">
                        {moment(transaction.createdAt).format(
                          'D/M/Y [ás] k:mm[h]'
                        )}
                      </div>
                    </Col>
                    <Col span={8}>
                      <TransactionValue
                        key={transaction.id}
                        value={transaction.valor}
                        type={transaction.tipo}
                      />
                    </Col>
                  </Row>
                ))
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  imageStyle={{ height: 60 }}
                />
              )}
              {lastTransactions.length ? (
                <Button
                  className="mt-1"
                  onClick={() => history.push('/transactions')}
                  type="primary"
                  ghost
                >
                  Visualizar todas
                </Button>
              ) : null}
            </Card>
          </Spin>
        </Col>
      </Row>
    </div>
  );
}
