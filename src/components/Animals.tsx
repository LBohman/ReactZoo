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
            console.log("if-statement activate");
        } else {
            axios.get<Animal[]>('https://animals.azurewebsites.net/api/animals')
            .then(response => {
            setAnimals(response.data);
            saveToLS((response.data));
        })
            console.log("else-statement activate");
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
        return (
            <li key={animal.id}>
                <h3>{animal.name}</h3>
                <div>
                    <p>{animal.shortDescription}</p>
                </div>
                <Link to={"/animal/" + animal.id}>Läs mer om {animal.name}</Link>
            </li>
        )
    })

    return (
    <ul>
        {liTags}
    </ul>
    );
}