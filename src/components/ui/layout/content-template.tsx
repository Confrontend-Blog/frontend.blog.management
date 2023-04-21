import styled from "styled-components";

type MainContentProps = {
  WrappedComponent: JSX.Element;
};

const ContentWrapper = styled.div(({ theme }) => ({
  paddingLeft: theme.spacing(5),
  paddingRight: theme.spacing(5),
}));

const ContentTemplate = ({ WrappedComponent }: MainContentProps) => {
  return <ContentWrapper>{WrappedComponent}</ContentWrapper>;
};

export default ContentTemplate;
