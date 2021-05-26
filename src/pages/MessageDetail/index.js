import React from 'react';
import { EllipsisOutlined } from '@ant-design/icons';

import NavBar from '@/components/NavBar';
import { getURLSearchParams } from '@/utils/tools';

function MessageDetail(props) {
  const { id } = getURLSearchParams(props.location.search);
  document.title = id;
  return (
    <>
      <NavBar
        title={id}
        rightView={<EllipsisOutlined className={NavBar.styles.icon} onClick={() => alert('菜单')} />}
        style={{
          color: '#fff',
          backgroundColor: '#108ee9'
        }}
      />
      Message ID: {id}
    </>
  );
}

export default MessageDetail;