import React, { useEffect } from "react";

type MicroFrontendProps = {
  windowObjectName: string;
  containerId: string;
};

export default function MicroFrontend({
  containerId,
  windowObjectName,
}: MicroFrontendProps) {
  useEffect(() => {
    const microFe = window[windowObjectName as any] as any;
    // Mount the microfrontend when the component is rendered
    microFe?.mount(containerId);

    // Unmount the microfrontend when the component is unmounted
    return () => microFe?.unmount(containerId);
  }, [containerId, windowObjectName]);

  return <div id={containerId} />;
}

MicroFrontend.displayName = "MicroFrontend";
