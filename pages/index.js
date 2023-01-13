import Head from "next/head";
import {useState} from "react";
import styles from "./index.module.css";

export default function Home(){
    const [carInput, setCarInput] = useState("");
    const [result, setResult] = useState();

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
                <title> Car Model Search</title>
                <link rel="icon" href="/car2.png"/>
            </Head>
            
            <main className={styles.main}>
                <img src="/car2.png" className={styles.icon}/>
                <h3>Search Car Model</h3>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="car"
                        placeholder="Enter a Car Model"
                        value={carInput}
                        onChange={(e) => setCarInput(e.target.value)}
                       />
                       <input type="submit" value="Generate names"/>
                </form>
                <div className={styles.result}>{result}</div>
            </main> 
        </div>
    );
}