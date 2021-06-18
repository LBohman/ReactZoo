import { Link } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { Animal } from "../models/Animal";

interface IAnimalParams {
    id: string;
}

export const AnimalDetails = () => {
    //useParams: Används för att hitta den parameter, här id, för att routen ska visas korrekt
    let { id } = useParams<IAnimalParams>();

    //State: Används för att lagra data i den form som önskas
    let defaultValue: Animal = {
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
    const animalListLS = localStorage.getItem('animalList');

    //useEffect: Används för att hämta data från API:et
    useEffect(() => {
        //ngOnInit i angular

        if (animalListLS) {
            const parsedAnimalList = JSON.parse(animalListLS);
            const animal = parsedAnimalList.filter((animal: Animal) => animal.id === Number(id))[0];
            setAnimal(animal);
        } else {
            axios.get<Animal[]>('https://animals.azurewebsites.net/api/animals/' /* + id */)
            .then((response) => {
            const responseApi = response.data;
            const singleAnimal = responseApi.filter((animal: Animal) => animal.id === Number(id))[0];
            setAnimal(singleAnimal);
            localStorage.setItem("animalList", JSON.stringify(responseApi));
            });
        }
    }, [id]);

    function feedAnimal() {
        if(animalListLS !== null) {
            const list = JSON.parse(animalListLS);
            for (let i = 0; i < list.length; i++) {
                if(list[i].id == id) {
                    list[i].isFed = true;
                    list[i].lastFed = new Date();
                    localStorage.setItem('animalList', JSON.stringify(list));
                    setAnimal(list[i]);
                }
            }
        }
        
    }

    //Presenterar data som har hämtats
    return (<div className="detailContainer">
        <h3>{animal.name}</h3>
        <p>{animal.shortDescription}</p>
        {animal.isFed ? <p>Mätt</p> : <p>Hungrig</p>}
        <button onClick={feedAnimal} disabled={animal.isFed}>Mata {animal.name}</button>
        <div className="imgContainer">
            <img src={animal.imageUrl} alt={animal.latinName} />
        </div>
        <h4>{animal.latinName}</h4>
        <p>{animal.longDescription}</p>
        <Link to="/">Tillbaka till listan</Link>
    </div>
    );
};