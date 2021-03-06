import React from "react";
import {Table as AntDTable} from "antd";
import "./style.css";

export type Columns = {
  key: string;
  dataIndex: string;
  title: string;
  sorter?: any;
};

export type Row = {
  memberCount: number;
  memberCountIncreaseWeekly: number;
  postCountIncreaseDaily: number;
  postCountIncreaseMonthly: number;
};

type Props = {
  columns: Columns[];
  data: {[key: string]: any}[];
};

export const Table = ({columns, data}: Props) => (
  <AntDTable columns={columns} dataSource={data} rowKey="_id" />
);
