import Typography from "commons/components/Typography";
import callApi from "commons/util/callApi";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  max-width: 1024px;
  margin: 40px auto;
`;

const errorGroupNameMap = {
  fileFormat: "File format",
};

function Report() {
  const [report, setReport] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const report = await callApi(`documents/${id}/recentReport`);
      setReport(report);
      setLoading(false);
    }
    fetchData();
  }, [id]);

  if (loading) {
    return <>loading...</>;
  }

  if (!report) {
    return <>Report not found</>;
  }

  return (
    <Container>
      <Typography variant="h1">Validation report (file ID: {id})</Typography>
      {report.errorGroups?.map((group) => (
        <div key={group.groupName}>
          <Typography variant="h3" margin={"24px 0 0 0"}>
            {errorGroupNameMap[group.groupName] || group.groupName}
          </Typography>
          {group.messages.map((message) => (
            <Typography variant="body1" key={message}>
              {message}
            </Typography>
          ))}
        </div>
      ))}
    </Container>
  );
}

export default Report;
