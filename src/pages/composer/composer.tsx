import { Button } from "@Confrontend/ui-library";
import debounce from "lodash/debounce";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";

import { createArticle } from "../../api/clients/create-article";
import { uploadImage } from "../../api/clients/upload-image";
import { convertToMarkdown } from "../../utils/markdown.util";
import { titleToSlug } from "../../utils/string.util";
import * as S from "./composer.styled";

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

const Composer = () => {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const quillRef = useRef<ReactQuill>(null);

  useEffect(() => {
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      quill.getModule("toolbar").addHandler("image", customImageHandler);
    }
  }, []);

  const customImageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.setAttribute("name", "file123");

    console.log(input);

    // Open user file dialog
    input.click();

    input.onchange = async () => {
      const editor = quillRef.current!.editor;

      if (editor) {
        const file = input.files && input.files[0];
        console.log(input.files);

        const range = editor?.getSelection(true);

        if (file) {
          const imageInfo = await uploadImage(file);
          // TODO handle uploaded image path
          editor.insertEmbed(range.index, "image", imageInfo.mobile.png);
        }
      }
    };
  };

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
    console.log("onsubmit", event);

    // if (quillRef?.current) {
    //   const json: DeltaStatic = quillRef?.current?.getEditor().getContents();
    //   console.log(json);

    const contentMarkdown = convertToMarkdown(content);
    const summaryMarkdown = convertToMarkdown(summary);

    console.log(contentMarkdown);

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
          variant="filled"
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
          variant="filled"
          label="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <S.StyledAutocomplete
          defaultValue={categories[0]}
          PopperComponent={S.AutocompletePopper}
          value={category}
          onChange={(newValue) => {
            setCategory(newValue?.toString() || categories[0]);
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
          ref={quillRef}
          placeholder="Content text here..."
          modules={modules}
          value={content}
          onChange={onBodyChange}
        />
        <S.Footer>
          <Button
            type="submit"
            disabled={!title || !content || !slug || !category}
          >
            Create
          </Button>
        </S.Footer>
      </form>
    </S.ArticleCreateContainer>
  );
};

export default Composer;
