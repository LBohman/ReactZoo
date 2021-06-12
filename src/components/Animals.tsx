import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Animal } from "../models/Animal";

export const Animals = () => {
    let defaultValue: Animal[] = [];
    const [animals, setAnimals] = useState(defaultValue);

    useEffect(() => {
        //ngOnInit i angular

        axios.get<Animal[]>('https://animals.azurewebsites.net/api/animals').then(response => {
            setAnimals(response.data);
            console.log(response.data);
        })
    }, []);

    let liTags = animals.map((animal) => {
        return (
            <li key={animal.id}>
                <h4>{animal.name}</h4>
                <p>{animal.shortDescription}</p>
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