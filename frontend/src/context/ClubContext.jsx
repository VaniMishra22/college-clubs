const { createContext, useContext, useState } = require("react");

const ClubContext = createContext();

export const ClubProvider = ({ children }) => {

    const [selClub, setSelClub] = useState(null);

    return <ClubContext.Provider>{children}</ClubContext.Provider>;
}

const useClubContext = () => useContext(ClubContext);

export default useClubContext;