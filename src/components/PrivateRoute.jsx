import { useUser } from "context/userContext";

const PrivateRoute = ({ estadoList, roleList, children }) => {
  const { userData } = useUser();

  if (estadoList.includes(userData.estado) && roleList.includes(userData.rol)) {
    return children;
  } else {
    return null;
  }
  
};

export default PrivateRoute;
