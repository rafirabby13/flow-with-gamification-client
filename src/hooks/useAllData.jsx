import { useQuery } from '@tanstack/react-query'

const useAllData = () => {
  const {data: allData=[], isLoading} = useQuery({
    queryKey: ['data'],
    queryFn: async ()=>{
        const response = await fetch('http://localhost:5000/data');
      const result = await response.json();
    //   console.log(result);
      return result;
    }
  })
  return [allData, isLoading]
}

export default useAllData