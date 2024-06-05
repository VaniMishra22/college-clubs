import { useParams } from "next/navigation";

const { createContext, useContext, useState } = require("react");

const ClubContext = createContext();

export const ClubProvider = ({ children }) => {

    const { id } = useParams();
    // console.log(id);
    const [selClub, setSelClub] = useState(null);

    const fetchClubDetails = () => {
        fetch("http://localhost:5000/club/getbyid/" + id)
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setSelClub(data);
          })
          .catch((err) => {
            console.log(err);
          });
      }

    return <ClubContext.Provider value={{ selClub, setSelClub, fetchClubDetails }}>
        {children}
    </ClubContext.Provider>;
}

const useClubContext = () => useContext(ClubContext);

export default useClubContext;