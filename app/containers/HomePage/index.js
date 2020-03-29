import React, { useEffect } from 'react';
import { Table, Row, Col, Divider, Typography, Card } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { selectUsers, selectUsersLoading } from './selectors';
import { fetchUsersRequest, reducer } from './slice';
import saga from './saga';
import wizard from '../../wizard/saga';

const { Title, Text } = Typography;
const key = 'home';

export default function HomePage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  useInjectSaga({ key: 'wizard', saga: wizard });
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
  const usersLoading = useSelector(selectUsersLoading);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, []);

  return (
    <Row>
      <div style={{ marginRight: 'auto', marginLeft: 'auto', marginTop: -20 }}>
        <Title level={1}>Welcome to Redux Saga Wizard</Title>
      </div>
      <Divider
        style={{
          background: 'rgba(0,0,0,0.10)',
          marginTop: 0,
          marginBottom: 20,
        }}
      />
      <Col span={20} offset={2}>
        <Card>
          <Text>
            <b>
              Look at the data. Data is automatically refreshed by the wizard.
              You can check your browser console and network requests made by
              the wizard in network tab.
            </b>
          </Text>
        </Card>
      </Col>
      <Col span={2} />
      <Col span={5} offset={2}>
        <div style={{ background: '#fff', marginTop: 20 }}>
          <Table
            key="id"
            loading={usersLoading}
            size="small"
            pagination={false}
            dataSource={users}
            columns={[
              {
                title: usersLoading ? 'Fetching...' : 'USERS',
                dataIndex: 'name',
                key: 'name',
              },
            ]}
          />
        </div>
      </Col>
    </Row>
  );
}
