import { useQuery } from "@tanstack/react-query";

const useMark = () => {
    const {data: mark=[], isLoading} = useQuery({
        queryKey: ['marks'],
        queryFn: async ()=>{
            const response = await fetch('https://flow-with-gamification-server.vercel.app/allmarks');
          const result = await response.json();
        //   console.log(result);
          return result;
        }
      })
      return [mark, isLoading]
}

export default useMark