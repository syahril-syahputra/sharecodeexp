import axios from '@/lib/axios';
const {useState, useEffect} = require('react');

function useDataCity(provinceId) {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const loadSectors = await axios.get(`/region/${provinceId}/city`);
      const sectors = loadSectors?.data?.data || [];
      setData([...sectors, {id: 'other', name: 'Other', state_id: provinceId}]);
    }
    fetchData();
  }, [provinceId]);
  return data;
}

export default useDataCity;
