import { Anime } from "../Types/Anime"
import { useState,useEffect,useContext } from "react"
import { QueryContext } from "../App";
import HoverCard from "./HoverCard"
import Loading from "./Loding";

interface GridProps{
    url: string;
    text: string
}


function Grid({url, text = "Tus resultados"} : GridProps){
    const {query,setQuery} = useContext(QueryContext)
    const [loading,setLoading] = useState (true)
    const [data,setData] = useState <Array<Anime>>([])
    const url2 = `https://api.jikan.moe/v4/anime?q=${query}` 
    useEffect(() => {
        fetch(url.length === 0 ? url2 : url).then(response => response.json()).then(datae => {
            setLoading(false)
            setData(datae.data)}).catch(err => console.log(`Error ${err}`))
    },[query,setQuery])

    if(loading){
        return(
            <Loading></Loading>
        )
    }

    return(
        <div className="p-4 md:p-8">
            <h3 className="font-medium">{text}</h3>
            <section className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 xl:grid-cols-10  gap-2 ">
                {data && data.map((item) => (
                    <HoverCard item={item} key={item.mal_id}></HoverCard>
                ))}
            </section>
        </div>
    )
}


export default Grid