import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";

import Composer from "./composer";

jest.mock("@confrontend/ui-library", () => ({
  CuiButton: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick: () => void;
  }) => <button onClick={onClick}>{children}</button>,
}));

describe("ArticleManagementCreate", () => {
  const cancelCb = jest.fn();

  beforeEach(() => {
    cancelCb.mockClear();
  });

  it("should call cancel callback when Cancel button is clicked", () => {
    render(<Composer cancelCb={cancelCb} />);
    const cancelButton = screen.getByText("Cancel");
    fireEvent.click(cancelButton);
    expect(cancelCb).toHaveBeenCalledTimes(1);
  });

  it.todo("should call backend when Create button is clicked", () => {
    render(<Composer cancelCb={cancelCb} />);
    const createButton = screen.getByText("Create");
    fireEvent.click(createButton);
    // expect(onCreatePost).toHaveBeenCalledTimes(1);
  });
});
