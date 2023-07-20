import { Table } from "@Confrontend/ui-library";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Collapse, IconButton } from "@mui/material";
import { useEffect, useState } from "react";

import { getSummaries } from "../../../api/clients/get-article-summaries";
import { ArticleSummaryDto } from "../../../api/openapi/generated-clients/api-blog";
import * as S from "./article.styled";

function Articles() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [details, setDetails] = useState("Select a row to see details");
  const [articleSummaries, setArticleSummaries] = useState<
    ArticleSummaryDto[] | undefined
  >([] as ArticleSummaryDto[]);

  const columns = [
    { Header: " ", Cell: ({ row }: any) => row.index + 1, width: "5%" },
    {
      Header: "Summary",
      accessor: "summary", //is hidden
    },
    {
      Header: "Title",
      accessor: "title",
      width: "30%",
    },
    {
      Header: "Date",
      accessor: "date",
      width: "15%",
    },
    {
      Header: "Category",
      accessor: "category",
      width: "15%",
    },
    {
      Header: "Author",
      accessor: "author",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSummaries(1, 100);
      setArticleSummaries(res?.summaries);
    };

    fetchData();
  }, []);

  const onRowClick = (row: ArticleSummaryDto) => {
    setDetails(row.summary || "");
    setIsCollapsed(false);
  };

  return (
    <S.Wrapper isCollapsed={isCollapsed}>
      {articleSummaries?.length && (
        <Table<ArticleSummaryDto>
          data={articleSummaries}
          onRowClick={onRowClick}
          columns={columns}
          hiddenColumns={["summary"]}
        />
      )}

      <div>
        <div>
          <IconButton
            data-testid="expand"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? (
              <ExpandMore
                fontSize="large"
                style={{ transform: "rotate(90deg)" }}
              />
            ) : (
              <ExpandLess
                fontSize="large"
                style={{ transform: "rotate(90deg)" }}
              />
            )}
          </IconButton>
          <Collapse in={!isCollapsed} orientation="vertical">
            {!isCollapsed && (
              <div>
                <h3>Summary</h3>
                {details}
              </div>
            )}
          </Collapse>
        </div>
      </div>
    </S.Wrapper>
  );
}

export default Articles;
