import { useState } from "react";
import * as S from "./composer.styled";
import debounce from "lodash/debounce";
import { Autocomplete, TextField } from "@mui/material";
import { titleToSlug } from "../../utils/string.util";
import { convertToMarkdown } from "../../utils/markdown.util";

import { createArticle } from "../../../api/clients/create-article";
import CuiButton from "../../components/ui/button/cui-button";

interface ArticleCreateProps {
  cancelCb: () => void;
}

const modules = {
  clipboard: {
    matchVisual: false,
  },
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image"],
    ["clean"],
  ],
};

/**TODO fetch dynamically */
const categories = [
  "Frontend",
  "Fullstack",
  "Database",
  "DevOps",
  "Cloud",
  "Security",
  "Mobile",
  "AI",
  "ML",
  "Blockchain",
  "Gaming",
  "Testing",
  "UX",
  "Version Control",
];

const Composer = ({ cancelCb }: ArticleCreateProps) => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0]);

  const updateSlug = debounce((title) => {
    setSlug(titleToSlug(title));
  }, 500);

  const onBodyChange = (value: string) => {
    setContent(value);
  };

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
    updateSlug(event.target.value);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    const contentMarkdown = convertToMarkdown(content);
    const summaryMarkdown = convertToMarkdown(summary);

    event.preventDefault();
    createArticle({
      title,
      slug,
      content: contentMarkdown,
      category,
      summary: summaryMarkdown,
      date: new Date().toISOString(),
      author: "H",
    })
      .then(console.log)
      .catch(console.log);
  };

  return (
    <S.ArticleCreateContainer>
      <form onSubmit={onSubmit}>
        <S.StyledTextField
          fullWidth
          variant="standard"
          label="Title"
          value={title}
          onChange={onTitleChange}
          required
        />
        <S.Slug>
          {!slug ? "Slug is auto generated based on title" : slug}
        </S.Slug>
        <S.StyledTextField
          fullWidth
          variant="standard"
          label="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <S.StyledAutocomplete
          fullWidth
          defaultValue={categories[0]}
          PopperComponent={S.AutocompletePopper}
          value={category}
          onChange={(event, newValue) => {
            setCategory(newValue?.toString() || "");
          }}
          options={categories}
          renderInput={(params) => (
            <S.StyledTextField
              {...params}
              label="Category"
              variant="standard"
              required
            />
          )}
        />
        <S.ContentQuill
          placeholder="Content text here..."
          modules={modules}
          value={content}
          onChange={onBodyChange}
        />

        <S.Footer>
          <span>
            <CuiButton
              bgColor="#222"
              disabled={!title || !content || !slug || !category}
            >
              Create
            </CuiButton>
            <CuiButton bgColor="#222" onClick={cancelCb}>
              Cancel
            </CuiButton>
          </span>
        </S.Footer>
      </form>
    </S.ArticleCreateContainer>
  );
};

export default Composer;
