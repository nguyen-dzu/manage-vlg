import { Pagination } from "antd";
import { useState } from "react";

export default function MyPagination({ props, setPagination, setLoading }) {
  const {total} = props;
  const [current, setCurrent] = useState(1);

    const onChange = (page, pageSize, SearchContent) => {
      setCurrent(page);
    setPagination({
      ...props,
      pageSize: pageSize,
      current: page,
      SearchContent: SearchContent ? SearchContent : ''
    }); 
    setLoading(true);
  };
  return (
    <Pagination //properties
      current={current}
      total={total}
      onChange={onChange}
      pageSizeOptions={["10", "20", "30"]}
      showSizeChanger
    />
  );
}
