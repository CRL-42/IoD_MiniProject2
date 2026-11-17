import { useState, useEffect } from "react";

export default function useData(url) {
    const [data, setData] = useState(null);

    useEffect(() => {
        if (!url) return;
            const controller = new AbortController();
            let ignore = false;
            
            fetch(url, {signal: controller.signal})
              .then((response) => response.json())
              .then((json) => {
                if (!ignore) {
                    setData(json);
                }
              })
              .catch((error) => {
                if (error.name !== 'AbortError') {
                    console.error('Fetch error:', error);
                }
              })

            return () => {
                ignore = true;
                controller.abort();
            };
    }, [url]);

    return data;
}