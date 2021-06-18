import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Animal } from "../models/Animal";

export const Animals = () => {
    let defaultValue: Animal[] = [];
    const [animals, setAnimals] = useState(defaultValue);

    //ngOnInit i angular
    useEffect(() => {

        if(localStorage.animalList) {
            fetchFromLS();
        } else {
            axios.get<Animal[]>('https://animals.azurewebsites.net/api/animals')
            .then(response => {
            setAnimals(response.data);
            saveToLS((response.data));
            });
        }

    }, []);

    function fetchFromLS() {
        let listFromLS = localStorage.getItem('animalList');
        if(listFromLS === null) {
            console.log("LS is empty");
        } else {
            let animals = JSON.parse(listFromLS);
            setAnimals(animals);
        }
    }

    function saveToLS(responseApi: Animal[]) {
        for (let i = 0; i < responseApi.length; i++) {
            const element = responseApi[i];
            defaultValue.push(element);
            }
        let stringifiedList = JSON.stringify(defaultValue);
        localStorage.setItem("animalList", stringifiedList);
    }

    let liTags = animals.map((animal) => {
        let feedingTime = new Date().getTime() - new Date(animal.lastFed).getTime();
        let differenceTime = Math.floor(feedingTime / (1000*60*50));
        let hungry = differenceTime >= 4;
        return (
            <li key={animal.id}>
                <h3>{animal.name}</h3>
                <div>
                    <p>{animal.shortDescription}</p>
                    {hungry ? <p>{animal.name} är hungrig!</p> : <p>{animal.name} är mätt och belåten.</p>}
                </div>
                <Link to={"/animal/" + animal.id}>Läs mer om {animal.name}</Link>
            </li>
        )
    })

    return (
    <>
    <h1>Djurlista</h1>
    <ul>
        {liTags}
    </ul>
    </>
    );
}