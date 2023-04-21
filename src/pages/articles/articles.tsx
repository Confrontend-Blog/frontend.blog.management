import { Collapse, IconButton } from "@mui/material";
import Table from "../../components/ui/table/table";
import * as S from "./article.styled";
import { useEffect, useState } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ArticleSummariesResponse,
  ArticleSummaryDto,
} from "../../../api/openapi/generated-clients";
import { getSummaries } from "../../../api/clients/get-article-summaries";

function Articles() {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [details, setDetails] = useState("");
  const [articleSummaries, setArticleSummaries] = useState<
    ArticleSummaryDto[] | undefined
  >([] as ArticleSummaryDto[]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getSummaries(1, 100);
      console.log(res?.summaries);
      setArticleSummaries(res?.summaries);
    };

    fetchData();
  }, []);

  const onRowClick = (row: any) => {
    setDetails(row.values?.summary || "");
    setIsCollapsed(false);
  };
  return (
    <S.Wrapper isCollapsed={isCollapsed}>
      {articleSummaries?.length && (
        <Table data={articleSummaries} onRowClick={onRowClick} />
      )}

      <div>
        <div>
          <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
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
            {!isCollapsed && <div>{details}</div>}
          </Collapse>
        </div>
      </div>
    </S.Wrapper>
  );
}

export default Articles;
