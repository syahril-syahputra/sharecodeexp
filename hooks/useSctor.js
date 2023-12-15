import axios from '@/lib/axios';

const {useState, useEffect} = require('react');

function useData() {
  const [data, setData] = useState([{value: 'other', label: 'Other'}]);

  useEffect(() => {
    async function fetchData() {
      const loadSectors = await axios.get(`/sectorlist`);
      const sectors = loadSectors?.data?.data || [];
      setData([...sectors, {value: 'other', label: 'Other'}]);
    }
    fetchData();
  }, []);

  return data;
}

export default useData;
