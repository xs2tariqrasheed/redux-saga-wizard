import React, { useEffect } from 'react';
import { Table, Row, Col } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useInjectReducer, useInjectSaga } from 'redux-injectors';

import { selectUsers, selectUsersLoading } from './selectors';
import { fetchUsersRequest, reducer } from './slice';
import saga from './saga';

const key = 'home';

export default function HomePage() {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const dispatch = useDispatch();

  const users = useSelector(selectUsers);
  const usersLoading = useSelector(selectUsersLoading);

  useEffect(() => {
    dispatch(fetchUsersRequest());
  }, []);

  return (
    <Row>
      <Col span={5} offset={2}>
        <div style={{ background: '#fff' }}>
          <Table
            loading={usersLoading}
            size="small"
            pagination={false}
            dataSource={users}
            columns={[
              {
                title: 'Users',
                dataIndex: 'name',
              },
            ]}
          />
        </div>
      </Col>
    </Row>
  );
}
