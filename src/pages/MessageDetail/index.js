import React from 'react';
import { getURLSearchParams } from '@/utils/tools';

function MessageDetail(props) {
  const { id } = getURLSearchParams(props.location.search);
  return (
    <div>
      Message ID: {id}
    </div>
  );
}

export default MessageDetail;
