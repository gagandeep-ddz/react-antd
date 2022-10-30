import React, { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { CSVLink } from "react-csv";
import { Layout, Table as AntdTable, Button } from "antd";
import { PrinterOutlined, DownloadOutlined } from "@ant-design/icons";

import "antd/dist/antd.css";

const { Content } = Layout;

const Table = (props) => {
  const { columns, data, isPrintable, isDownloadable, printableColumns } =
    props;
  const ref = useRef();

  const [tableState, setTableState] = useState({
    columns,
    pagination: {
      hideOnSinglePage: true,
      pageSize: 20,
      showSizeChanger: false,
    },
    resolve: () => undefined,
  });

  useEffect(() => {
    tableState.resolve();
  }, [tableState]);

  const handlePrint = useReactToPrint({
    onBeforeGetContent: () => {
      return new Promise((resolve) => {
        setTableState({
          columns: printableColumns,
          pagination: {
            hideOnSinglePage: true,
            pageSize: data.length,
            showSizeChanger: false,
          },
          resolve,
        });
      });
    },
    content: () => ref.current,
    pageStyle: "@page { size: 25.5in 20in }",
    onAfterPrint: () => {
      return new Promise((resolve) => {
        setTableState({
          columns: columns,
          pagination: {
            hideOnSinglePage: true,
            pageSize: 20,
            showSizeChanger: false,
          },
          resolve,
        });
      });
    },
  });

  return (
    <Layout>
      <Content className="container">
        {isPrintable && (
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            size="large"
            className="p-4"
            onClick={handlePrint}
          />
        )}
        {isDownloadable && (
          <Button
            type="primary"
            icon={<DownloadOutlined />}
            size="large"
            className="p-4"
          >
            <CSVLink filename={"Users.csv"} data={data} />
          </Button>
        )}
        <div ref={ref}>
          <AntdTable
            columns={tableState.columns}
            dataSource={data}
            pagination={tableState.pagination}
            scroll={{
              x: 1000,
            }}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default Table;
