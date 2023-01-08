import React,{createContext,useState} from "react";


const FavouritesContext = createContext(
    {
        favourites:[],
        setFavourites:()=>{}
    }
);




export {FavouritesContext};

