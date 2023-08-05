let microFrontendPromise: Promise<any> | null = null;
let microFrontendModule: any = null;

export type MicroFe = {
  mount: (containerId: string) => void;
  unmount: (containerId: string) => void;
};

// Currently there is only 1 micro fe. later the function can be extended to support more. (YAGNI)
export const loadMicroFrontend = async (): Promise<MicroFe | undefined> => {
  if (!microFrontendPromise) {
    microFrontendPromise = System.import(
      // TODO handle url via a config or env variable
      "http://127.0.0.1:4173/main-chat-fe.js"
    )
      .then((module) => {
        microFrontendModule = module;
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
