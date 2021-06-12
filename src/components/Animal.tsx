import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { AnimalDetails } from "../models/AnimalDetails";

interface IAnimalParams {
    id: string;
}

export const Animal = () => {
    //useParams: Används för att hitta den parameter, här id, för att routen ska visas korrekt
    let { id } = useParams<IAnimalParams>();

    //State: Används för att lagra data i den form som önskas
    let defaultValue: AnimalDetails = {
        id: 0, name: '',
        latinName: '',
        yearOfBirth: 0,
        shortDescription: '',
        longDescription: '',
        imageUrl: '',
        isFed: false,
        lastFed: new Date()
    };
    const [animal, setAnimal] = useState(defaultValue);

    //useEffect: Används för att hämta data från API:et
    useEffect(() => {
        //ngOnInit i angular

        axios.get('https://animals.azurewebsites.net/api/animals/' + id)
        .then((response) => {
            setAnimal(response.data);
        });
    }, [id]);

    //Presenterar data som har hämtats
    return (<div>
        {/* <p>Animal id: {id}</p> */}
        <h3>{animal.name}</h3>
        <p>{animal.shortDescription}</p>
        <img src={animal.imageUrl} alt="" />
        <h4>{animal.latinName}</h4>
        <p>{animal.longDescription}</p>
        <Link to="/">Return to list</Link>
    </div>
    );
};