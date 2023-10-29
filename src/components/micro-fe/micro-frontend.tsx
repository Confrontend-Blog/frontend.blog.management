import { useEffect } from "react";

import { loadMicroFrontend, MicroFe } from "../../utils/micro-fe-utils";

type MicroFrontendProps = {
  containerId: string;
};

export default function MicroFrontend({ containerId }: MicroFrontendProps) {
  useEffect(() => {
    let microFe: MicroFe | undefined;
    // TODO handle failed/non-ideal state
    const loader = async () => {
      console.log(321456);

      microFe = await loadMicroFrontend();
      microFe && microFe.mount(containerId);
    };
    loader();

    return () => microFe && microFe.unmount(containerId);
  }, [containerId]);

  return <div id={containerId} />;
}

MicroFrontend.displayName = "MicroFrontend";
