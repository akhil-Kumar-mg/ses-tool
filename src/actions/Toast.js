import { useContext } from 'react';
import { useToasts } from "react-toast-notifications";
import {Context as AppContext} from '../context/AppContext';


const useNotify = () => {
    const appContext = useContext(AppContext);
    const { showCustomModal } = appContext;

    const { addToast } = useToasts();
   
   const notify = (message, state) => {

        if(message !== "Cannot read property 'data' of undefined" && message !== "Request failed with status code 403") {
            showCustomModal(state, message)
            // addToast(message, { appearance: state, autoDismiss: true });
        }
    }
   return { notify };
}
export default useNotify;
