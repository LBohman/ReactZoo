import axios from "axios";
import { useEffect, useState } from "react";
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
    //return (<div>Displaying component Animals.tsx on screen.</div>);
    return (<div>Found: {animals.length}</div>);
}