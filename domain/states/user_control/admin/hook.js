import axios from '@/lib/axios';
import {useState, useEffect, useCallback} from 'react';

/**
 * This hook directory for implmentation redux
 */
export const useSideBarStatus = (session) => {
  // if we want use redux dispatch action
  // and get data from state
  const [stateStatus, setStateStatus] = useState({
    order: {
      active: '0',
      complete: '0',
      inquiries_rejected: '0',
      not_arrived: '0',
      quotation_rejected: '0',
    },
    product: {
      approved: '0',
      pending: '0',
      rejected: '0',
    },
    registry: {
      approved: '0',
      pending: '0',
      rejected: '0',
    },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchStatus = useCallback(async () => {
    try {
      const result = await axios.get('admin/sidebar', {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
        },
      });
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
