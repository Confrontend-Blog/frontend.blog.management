import { useLocation } from "react-router-dom";

const useParamFromUrl = (param: string): string | null => {
  const location = useLocation();

  const searchParams = new URLSearchParams(location.search);

  return searchParams.get(param);
};

export default useParamFromUrl;
