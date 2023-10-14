let microFrontendPromise: Promise<any> | null = null;

export type MicroFe = {
  mount: (containerId: string) => void;
  unmount: (containerId: string) => void;
};

// Currently there is only 1 micro fe. later the function can be extended to support more. (YAGNI)
export const loadMicroFrontend = async (): Promise<MicroFe | undefined> => {
  if (!microFrontendPromise) {
    microFrontendPromise = System.import(
      // Public Url of micro fe bundle on GCP Bucket
      "https://storage.googleapis.com/chat-micro-fe/main-chat-fe-1.js"
    )
      .then((module) => {
        console.log(JSON.stringify(module));

        return { ...module }; // protect against mutation
      })
      .catch((err) => {
        console.error("Failed to load microfrontend", err);
        // If loading fails, we should allow retries.
        microFrontendPromise = null;
        throw err;
      });
  }

  return microFrontendPromise;
};
