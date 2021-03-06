import React from "react";
import moment from "moment";
import {Table, Row} from "../../components/table";
import data from "../../latest.json";
import "./style.css";
import {Link} from "react-router-dom";

const columns = [
  {
    key: "_id",
    dataIndex: "_id",
    title: "Mongo ID",
    display: false,
  },
  {
    key: "id",
    dataIndex: "id",
    title: "ID",
    display: false,
  },
  {
    key: "scrapeID",
    dataIndex: "scrapeID",
    title: "Scrape Batch ID",
    display: false,
  },
  {
    key: "scrapedAt",
    dataIndex: "scrapedAt",
    title: "Last Updated",
  },
  {
    key: "name",
    dataIndex: "name",
    title: "Name",
  },
  {
    key: "isPublic",
    dataIndex: "isPublic",
    title: "Public",
  },
  {
    key: "foundedOn",
    dataIndex: "foundedOn",
    title: "Created",
  },
  {
    key: "description",
    dataIndex: "description",
    title: "Description",
  },
  {
    key: "locations",
    dataIndex: "locations",
    title: "Locations",
  },
  {
    key: "memberCount",
    dataIndex: "memberCount",
    title: "Members",
    sorter: (a: Row, b: Row) => a.memberCount - b.memberCount,
  },
  {
    key: "memberCountIncreaseWeekly",
    dataIndex: "memberCountIncreaseWeekly",
    title: "Weekly Growth",
    sorter: (a: Row, b: Row) => a.memberCountIncreaseWeekly - b.memberCountIncreaseWeekly,
  },
  {
    key: "postCountIncreaseDaily",
    dataIndex: "postCountIncreaseDaily",
    title: "Daily Posts",
    sorter: (a: Row, b: Row) => a.postCountIncreaseDaily - b.postCountIncreaseDaily,
  },
  {
    key: "postCountIncreasMonthly",
    dataIndex: "postCountIncreaseMonthly",
    title: "Monthly Posts",
    sorter: (a: Row, b: Row) => a.postCountIncreaseMonthly - b.postCountIncreaseMonthly,
  },
];

const filter = (input: string) => {
  const MIN_LENGTH = 30;
  if (input === "Public") return undefined;
  if (input.length < MIN_LENGTH) return undefined;
  return input;
};

const shorten = (input?: string) => {
  const MAX_LENGTH = 100;
  if (!input) return "";
  if (input.length > MAX_LENGTH) return input.slice(0, MAX_LENGTH) + "...";
  return input;
};

export const InitiativeDirectory = () => (
  <div className="directory">
    <h1>PPE Initiative Directory</h1>
    <p>
      The table below is generated by scraping Facebook once a day. If you dont see an
      initiative, <Link to="/initiatives/submit">add it here</Link>.{" "}
      <strong>Please submit any and all initiatives, not just those on Facebook.</strong>
    </p>
    <Table
      columns={columns.filter((col) => col.display !== false)}
      data={data.map((entry) => ({
        ...entry,
        name: (
          <a
            href={`https://facebook.com/groups/${entry.id}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {entry.name}
          </a>
        ),
        description: filter(shorten(entry.description)),
        foundedOn: moment(entry.foundedOn).format("YYYY-MM-DD"),
        scrapedAt: moment(entry.scrapedAt).fromNow(),
        isPublic: entry.isPublic ? "Yes" : "No",
      }))}
    />
  </div>
);
