import React from 'react';

import NavBar from '@/components/NavBar';
import { getURLSearchParams } from '@/utils/tools';

function MessageDetail(props) {
  const { id } = getURLSearchParams(props.location.search);
  return (
    <>
      <NavBar title="消息内容" />
      Message ID: {id}
    </>
  );
}

export default MessageDetail;
