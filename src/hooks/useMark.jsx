import { useQuery } from "@tanstack/react-query";

const useMark = () => {
    const {data: mark=[], isLoading} = useQuery({
        queryKey: ['marks'],
        queryFn: async ()=>{
            const response = await fetch('http://localhost:5000/marks');
          const result = await response.json();
        //   console.log(result);
          return result;
        }
      })
      return [mark, isLoading]
}

export default useMark