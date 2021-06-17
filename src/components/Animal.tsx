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
    const animalListLS = localStorage.getItem('animalList');

    //useEffect: Används för att hämta data från API:et
    useEffect(() => {
        //ngOnInit i angular

        if (animalListLS) {
            const parsedAnimalList = JSON.parse(animalListLS);
            const animal = parsedAnimalList.filter((animal: AnimalDetails) => animal.id === Number(id))[0];
            setAnimal(animal);
        } else {
            axios.get<AnimalDetails[]>('https://animals.azurewebsites.net/api/animals/' /* + id */)
            .then((response) => {
            const responseApi = response.data;
            const singleAnimal = responseApi.filter((animal: AnimalDetails) => animal.id === Number(id))[0];
            setAnimal(singleAnimal);
            localStorage.setItem("animalList", JSON.stringify(responseApi));
            });
        }
        // if(localStorage.animalList) {
        //     let defaultValue = fetchFromLS();
        //     console.log(defaultValue);
            
        // } else {
        //     axios.get('https://animals.azurewebsites.net/api/animals/' + id)
        //     .then((response) => {
        //     setAnimal(response.data);
        // });
        // }
    }, [id]);

    function fetchFromLS() {
        let listFromLS = localStorage.getItem('animalList');
        if(listFromLS === null) {
            console.log("LS is empty");
        } else {
            let animals: AnimalDetails[] = JSON.parse(listFromLS);
            for (let i = 0; i < animals.length; i++) {
                
                if (parseInt(id) === animals[i].id) {
                    console.log(id, i);
                    return animals[i];
                }
                
            }
        }
    }

    function feedAnimal() {
        if(animalListLS !== null) {
            const list = JSON.parse(animalListLS);
            for (let i = 0; i < list.length; i++) {
                if(list[i].id == id) {
                    list[i].isFed = true;
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
        <div className="imgContainer">
            <img src={animal.imageUrl} alt={animal.latinName} />
        </div>
        <button onClick={feedAnimal}>Mata {animal.name}</button>
        <h4>{animal.latinName}</h4>
        <p>{animal.longDescription}</p>
        <Link to="/">Tillbaka till listan</Link>
    </div>
    );
};