import { useState, useEffect } from "react";
const  useMediaQuery = (query) => {
    const [matches,setMatch] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query);
        if(media.matches !== matches){
            setMatch(media.matches);
        }
        const listener = () =>{
            setMatch(media.matches);
        }
        window.addEventListener("resize",listener);
        return () => window.removeEventListener("resize",listener)
    },[matches,query]);
    return matches;
}
export default useMediaQuery;