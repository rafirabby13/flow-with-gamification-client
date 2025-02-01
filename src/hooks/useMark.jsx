import { useQuery } from "@tanstack/react-query";

const useMark = () => {
    const {data: totalMark=[], isLoading} = useQuery({
        queryKey: ['marks'],
        queryFn: async ()=>{
            const response = await fetch('https://flow-with-gamification-server.vercel.app/allmarks');
          const result = await response.json();
        //   console.log(result);
          return result;
        }
      })
      return [totalMark, isLoading]
}

export default useMark