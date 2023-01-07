import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../components/Card';

const Countries = () => {
    const [data, setData] = useState([]);
    const [sortData, setSortData] = useState([]);
    const [playOnce, setPlayOnce] = useState(true);
    const [rangeValue, setRangeValue] = useState(36);
    const [selectedRadio, setSelectedRodio] = useState("");

    const radio = ["Africa", "Americas", "Asia", "Europe", "Oceania"];


    useEffect(() => {

        if (playOnce) {
            axios.get(
                "https://restcountries.com/v2/all?fields=name,population,region,capital,flag"
            ).then((res) => {
                setData(res.data);
                setPlayOnce(false)
            });
        }

        const sortedCountry = () => {
            const countryObj = Object.keys(data).map((i) => data[i]);
            const sortedArray = countryObj.sort((a, b) => {
                return b.population - a.population
            })
            sortedArray.length = rangeValue;

            setSortData(sortedArray)
            console.log(sortedArray);
        }

        sortedCountry();

    }, [data, rangeValue, playOnce])
    // console.log(data);




    return (
        <div className='countries'>
            <div className='sort-container'>
                <input type="range" min="1" max="250" value={rangeValue} onChange={(e) => setRangeValue(e.target.value)} />

                <ul >
                    {radio.map((radio) => {
                        return (
                            <li key={radio} >
                                <input type="radio" checked={radio === selectedRadio} id={radio} value={radio} onChange={(e) => setSelectedRodio(e.target.value)} />
                                <label htmlFor={radio}> {radio} </label>
                            </li>
                        )
                    })}
                </ul>
            </div>

            <div className='cancel'>
                {selectedRadio && (
                    <h5 onClick={() => setSelectedRodio("")}> Annuler la recherche </h5>
                )}

            </div>


            <div className='countries-liste'>
                {sortData
                    .filter((country) => country.region.includes(selectedRadio))
                    .map((country) => (

                        <Card country={country} key={country.name} />
                    ))}
            </div>

        </div>
    );
};

export default Countries;