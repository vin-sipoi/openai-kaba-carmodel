import Head from "next/head";
import {useState} from "react";
import styles from "./index.css"

export default function Home(){
    const [carInput, setCarInput] = userState("");
    const [result, setResult] = userState();

    async function onSubmit(event){
        event.preventDefault();
        try{
            const response = await fetch("/api/generate", {
                method: "POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({car: carInput}),
            });

            const data = await response.json();
            if(response.status !== 200){
                throw data.error || new Error(`Request failed with status ${response.status}`);
            }

            setResult(data.result);
            setCarInput("");
        } catch(error){
            console.error(error);
            alert(error.message);
        }
    }

    return(
        <div>
            <Head>
                <title> OpenAI Quickstart</title>
                <link rel="icon" href="/car2.png"/>
            </Head>
            
            <main className={styles.main}>
                <img src="/car2.png" className={style.icon}/>
                <h3>Search Car Model</h3>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="car"
                        placeholder="Enter a Car"
                        value={carInput}
                        onChange={(e) =>(e.target.value)}
                       />
                       <input type="submit" value="Generate names"/>
                </form>
                <div className={style.result}>{result}</div>
            </main>
            
        </div>
    );
}