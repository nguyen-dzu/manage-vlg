import { Pagination } from "antd";
import { useState } from "react";

export default function MyPagination({ props, setPagination, setLoading }) {
  const {page, totalPages } = props;
  const [current, setCurrent] = useState(page ? page : 1);
    const onChange = (page, pageSize) => {
      setCurrent(page);
    setPagination({
      pageSize: pageSize,
      current: page,
    }); 
    setLoading(true);
  };
  return (
    <Pagination //properties
      current={current}
      total={totalPages}
      onChange={onChange}
      pageSizeOptions={["10", "20", "30"]}
      showSizeChanger
    />
  );
}
