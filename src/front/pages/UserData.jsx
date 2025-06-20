import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import useGlobalReducer from "../hooks/useGlobalReducer"

export const UserData = () =>{

  const {store}= useGlobalReducer();
          if(!store.user){
        return null
    }

    const handleListSponsor = async () =>{
         const { store } = useGlobalReducer();
         const [payments, setPayments] = useState([]);
         try {
            const response = await fetch("https://refactored-doodle-5gr9497rp94vh754r-3001.app.github.dev/api/payment-registration");
            const data = await response.json();

           
            const userPayments = data.filter(payment => payment.sponsor.user_id === store.user.id);
            setPayments(userPayments);
            console.log(payments)
        } catch (error) {
            console.error("Error fetching payments:", error);
        }
    }
      
        
    

    useEffect(() => {
        handleListSponsor();
    }, []);

     return(
        <section>
            <h1>
                Bienvenido usuario:
            </h1>
            <h2>
            {store.user.email}
            </h2>
             <h3>Tus pagos:</h3>
            <ul>
                {payments.map(payment => (
                    <li key={payment.id}>
                        Monto: {payment.amount} - Fecha: {payment.date_payment}
                    </li>
                ))}
            </ul>
        </section>
    )
}