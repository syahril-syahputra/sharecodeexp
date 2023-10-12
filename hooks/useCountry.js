import axios from '@/lib/axios';
const {useState, useEffect} = require('react');

function useDataCountry() {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const loadSectors = await axios.get(`/region/country`);
      const sectors = loadSectors?.data?.data || [];
      setData(sectors);
    }
    fetchData();
  }, []);
  return data;
}

export default useDataCountry;
