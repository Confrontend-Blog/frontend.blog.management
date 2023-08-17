import styled from "styled-components";

type MainContentProps = {
  title: string;
  WrappedComponent: JSX.Element;
};

const ContentWrapper = styled.div(({ theme }) => ({
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
}));

const ContentTemplate = ({ WrappedComponent, title }: MainContentProps) => {
  return (
    <ContentWrapper>
      <h1 data-testid="page-title">{title}</h1>
      {WrappedComponent}
    </ContentWrapper>
  );
};

export default ContentTemplate;
