import { useQuery } from '@tanstack/react-query'

const useAllData = () => {
  const {data: allData=[], isLoading} = useQuery({
    queryKey: ['data'],
    queryFn: async ()=>{
        const response = await fetch('https://flow-with-gamification-server.vercel.app/data');
      const result = await response.json();
    //   console.log(result);
      return result;
    }
  })
  return [allData, isLoading]
}

export default useAllData