import { useUser } from "context/userContext";
import { toast } from "react-toastify";

const PrivateRoute = ({ estadoList, roleList, children }) => {
  const { userData } = useUser();

  if (estadoList.includes(userData.estado) && roleList.includes(userData.rol)) {
    return children;
  } else {
    return toast.info("No estas autorizado par ingresar aquí...")
  }
  
};

export default PrivateRoute;
