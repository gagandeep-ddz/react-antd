import React, { useState, useEffect, useRef, useCallback, memo } from "react";
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

  const [loading, setLoading] = useState(true);

  const [tableState, setTableState] = useState({
    columns,
    pagination: {
      hideOnSinglePage: true,
      pageSize: 20,
      showSizeChanger: false,
    },
    resolve: () => null,
  });

  const [dataToDownload, setDataToDownload] = useState([]);

  useEffect(() => {
    tableState.resolve();
  }, [tableState]);

  useEffect(() => {
    if (data.length) {
      setLoading(false);
    }
    dataForPrint();
  }, [data]);

  const handlePrint = useReactToPrint({
    onBeforeGetContent: useCallback(() => {
      return new Promise((resolve) => {
        setTableState({
          columns: printableColumns,
          pagination: {
            hideOnSinglePage: true,
            pageSize: 20,
            showSizeChanger: false,
          },
          resolve,
        });
      });
    }, [tableState]),
    content: useCallback(() => ref.current, [ref.current]),
    pageStyle: "@page { size: 33.1in 23.4in }",
    onAfterPrint: useCallback(() => {
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
    }, [tableState]),
  });

  const handlePrintAll = useReactToPrint({
    onBeforeGetContent: useCallback(() => {
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
    }, [tableState]),
    content: useCallback(() => ref.current, [ref.current]),
    pageStyle: "@page { size: 33.1in 23.4in }",
    onAfterPrint: useCallback(() => {
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
    }, [tableState]),
  });

  const dataForPrint = useCallback(() => {
    let refactoredData = [];
    if (data && isPrintable) {
      for (let item in data) {
        refactoredData.push({
          [`${columns[0].title}`]: data[item][columns[0].key],
          [`${columns[1].title}`]: data[item][columns[1].key],
          [`${columns[2].title}`]: data[item][columns[2].key],
          [`${columns[3].title}`]: data[item][columns[3].key],
          [`${columns[4].title}`]: data[item][columns[4].key],
          [`${columns[5].title}`]: data[item][columns[5].key],
          [`${columns[6].title}`]: data[item][columns[6].key],
          [`${columns[7].title}`]: data[item][columns[7].key],
          [`${columns[8].title}`]: data[item][columns[8].key],
          [`${columns[9].title}`]: data[item][columns[9].key],
          [`${columns[10].title}`]: data[item][columns[10].key],
          [`${columns[11].title}`]: data[item][columns[11].key],
        });
      }
    }
    setDataToDownload(refactoredData);
  }, [data]);

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
          >
            Print Current Page
          </Button>
        )}
        {isPrintable && (
          <Button
            type="primary"
            icon={<PrinterOutlined />}
            size="large"
            className="p-4"
            onClick={handlePrintAll}
          >
            Print All
          </Button>
        )}
        {isDownloadable && (
          <CSVLink filename={"users.csv"} data={dataToDownload}>
            <Button
              type="primary"
              icon={<DownloadOutlined />}
              size="large"
              className="p-4"
            >
              Download CSV
            </Button>
          </CSVLink>
        )}
        <div ref={ref}>
          <AntdTable
            columns={tableState.columns}
            dataSource={data}
            pagination={tableState.pagination}
            loading={loading}
            scroll={{
              x: 1000,
            }}
          />
        </div>
      </Content>
    </Layout>
  );
};

export default memo(Table);
