import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const UserData = () =>{

  const {store}= useGlobalReducer();
          if(!store.user){
        return null
    }
    return(
        <section>
            <h1>
                Bienvenido usuario:
            </h1>
            <h2>
            {store.user.email}
            </h2>
        </section>
    )
}