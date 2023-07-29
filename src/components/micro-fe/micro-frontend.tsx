import { useEffect } from "react";

import { loadMicroFrontend, MicroFe } from "../../utils/micro-fe-utils";

type MicroFrontendProps = {
  containerId: string;
};

export default function MicroFrontend({ containerId }: MicroFrontendProps) {
  useEffect(() => {
    let microFe: MicroFe;
    // TODO handle failed / non ideal state
    const loader = async () => {
      microFe = await loadMicroFrontend();
      microFe.mount(containerId);
    };
    loader();

    return () => microFe && microFe.unmount(containerId);
  }, [containerId]);

  return <div id={containerId} />;
}

MicroFrontend.displayName = "MicroFrontend";
