import { useEffect, useState } from "react";

export function useApi(request, dependencies = []) {
  const [state, setState] = useState({ loading: true, data: null, error: null });
  useEffect(() => {
    let active = true;
    setState({ loading: true, data: null, error: null });
    request()
      .then(data => active && setState({ loading: false, data, error: null }))
      .catch(error => active && setState({ loading: false, data: null, error }));
    return () => { active = false; };
  }, dependencies);
  return state;
}
