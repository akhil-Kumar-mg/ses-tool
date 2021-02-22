import { useToasts } from "react-toast-notifications";


const useNotify = () => {
    const { addToast } = useToasts();
   
   const notify = (message, state) => {

        addToast(message, { appearance: state, autoDismiss: true });
    }
   return { notify };
}
export default useNotify;
