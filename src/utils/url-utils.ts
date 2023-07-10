import { useLocation } from "react-router-dom";

const useParamFromUrl = (param: string): string | null => {
  const location = useLocation();
  console.log(location);

  const searchParams = new URLSearchParams(location.search);
  console.log(searchParams);

  return searchParams.get(param);
};

export default useParamFromUrl;
