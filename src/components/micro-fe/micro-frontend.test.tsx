import { cleanup, waitFor } from "@testing-library/react";

import { customRender } from "../../data-mocks/custom-renderer";
import { loadMicroFrontend } from "../../utils/micro-fe-utils";
import MicroFrontend from "./micro-frontend";

jest.mock("../../utils/micro-fe-utils");

const containerId = "containerId";

const loadMicroFrontendMocked = jest.mocked(loadMicroFrontend);
const mockMicroFe = {
  mount: jest.fn(),
  unmount: jest.fn(),
};

describe("MicroFrontend component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    loadMicroFrontendMocked.mockResolvedValue(mockMicroFe);
  });

  afterEach(cleanup);

  it("renders with the given containerId", async () => {
    const { container } = customRender(
      <MicroFrontend containerId={containerId} />
    );

    expect(container.querySelector(`#${containerId}`)).not.toBeNull();
  });

  it("loads and mounts the micro frontend", async () => {
    const { container } = customRender(
      <MicroFrontend containerId={containerId} />
    );

    expect(loadMicroFrontend).toHaveBeenCalled();

    await waitFor(() => {
      expect(mockMicroFe.mount).toHaveBeenCalledWith(containerId);
      expect(container.querySelector(`#${containerId}`)).not.toBeNull();
    });
  });

  it("unmounts the micro frontend when component is unmounted", async () => {
    const { unmount, container } = customRender(
      <MicroFrontend containerId={containerId} />
    );

    // first check if correctly mounted
    await waitFor(() => {
      expect(container.querySelector(`#${containerId}`)).not.toBeNull();
    });

    // then unmount
    unmount();

    await waitFor(() => {
      expect(container.querySelector(`#${containerId}`)).toBeNull();
    });
  });
});
