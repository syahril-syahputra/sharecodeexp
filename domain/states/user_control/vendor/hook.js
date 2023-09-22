import axios from '@/lib/axios';
import {useState, useEffect, useCallback} from 'react';

/**
 * This hook directory for implmentation redux
 */
export const useRoleStatus = () => {
  // if we want use redux dispatch action
  // and get data from state
  const [stateStatus, setStateStatus] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      const endpoint = `role-status`;
      const result = await axios.get(endpoint);
      const arrStatus = result.data.data;
      setStateStatus(arrStatus);
    } catch (error) {
      setError(true);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchStatus();
  }, [fetchStatus]);

  return [stateStatus, loading, error];
};
