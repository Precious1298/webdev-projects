import { useEffect, useState } from 'react';
import getAccessToken from './getAccessToken';

export default function useFetchDataApi(URL, keyword, dispatch, options = {}) {
  const { dataActionType = 'setData', loadingActionType = 'setLoadingState' } =
    options;
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(
    function () {
      async function fetchData() {
        if (!URL || !keyword || keyword.trim().length < 3) return;

        setLoading(true);
        setError(null);

        if (dispatch && loadingActionType) {
          dispatch({ type: loadingActionType, payload: true });
        }

        try {
          const token = await getAccessToken();
          const response = await fetch(`${URL}${keyword}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch Destination data');
          }
          const result = await response.json();
          setData(result);
          if (dispatch && dataActionType) {
            dispatch({ type: dataActionType, payload: result });
          }
          console.log(result);
        } catch (error) {
          console.error('Error recieved', error.message);
          setError(error.message);
        } finally {
          setLoading(false);
          if (dispatch && loadingActionType) {
            dispatch({ type: loadingActionType, payload: false });
          }
        }
      }
      fetchData();
    },
    [URL, keyword, dispatch, dataActionType, loadingActionType]
  );
  return { data, error, loading };
}