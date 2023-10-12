import axios from '@/lib/axios';
const {useState, useEffect} = require('react');

function useDataProvince(countryId) {
  const [data, setData] = useState();

  // Array.prototype.push.apply(arr1,arr2);

  useEffect(() => {
    async function fetchData() {
      const loadSectors = await axios.get(`/region/${countryId}/state`);
      const sectors = loadSectors?.data?.data || [];
      setData([
        ...sectors,
        {id: 'other', name: 'Other', country_id: countryId},
      ]);
    }
    fetchData();
  }, [countryId]);
  return data;
}

export default useDataProvince;
