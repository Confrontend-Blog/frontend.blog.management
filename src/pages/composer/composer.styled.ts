import {
  Autocomplete,
  autocompleteClasses,
  Popper,
  TextField,
} from "@mui/material";
import ReactQuill from "react-quill";
import styled from "styled-components";

const v = {
  bg: "#fff",
  color: "#222",
};

export const ArticleCreateContainer = styled.div`
  background-color: ${v.bg};
  color: ${v.color};
  display: flex;
  flex-direction: column;
  position: relative;
  border-radius: 0.5em;
  padding: 1em;
  form > * {
    margin-bottom: 1em;
  }
`;

export const Header = styled.div`
  border-radius: 1em 1em 0 0;
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  height: 3em;
  line-height: 2em;
  vertical-align: middle;
`;

export const StyledTextField = styled(TextField)`

`;

export const SummaryQuill = styled(ReactQuill)`
  background-color: ${v.bg};
  border: none !important;
  .ql-container {
    border: none !important;
    .ql-editor {
      font-size: 1.2em;
      color: ${v.color};
      border: none !important;
    }
  }
  .ql-toolbar {
    z-index: 1;
    position: sticky;
    top: 0;
    background-color: ${v.bg};
    border: none !important;
    border-bottom: 1px solid ${v.color} !important;
  }
`;

export const ContentQuill = styled(ReactQuill)`
  background-color: ${v.bg};
  border: none !important;
  .ql-container {
    border: none !important;
    .ql-editor {
      font-size: 1.2em;
      height: 40vh;
      color: ${v.color};
      border: none !important;
    }
  }
  .ql-toolbar {
    z-index: 1;
    position: sticky;
    top: 0;
    background-color: ${v.bg};
    border: none !important;
    border-bottom: 1px solid ${v.color} !important;
  }
`;

export const Slug = styled.div`
  color: ${v.color};
  font-size: smaller;
`;

export const Summary = styled(ReactQuill)``;

export const ReactQuillWrapper = styled.div``;

export const Footer = styled.div`
  display: flex;
  padding-top: 1em;
  justify-content: flex-start;
  align-items: left;
  vertical-align: middle;
  border-top: 1px solid ${v.color} !important;
`;

export const StyledAutocomplete = styled(Autocomplete)`
  width: 20%;
  .MuiInputBase-root {
    background-color: ${v.bg};
  }
`;

export const AutocompletePopper = styled(Popper)`
  .${autocompleteClasses.listbox} {
    font-size: 0.9em;
  }
`;
