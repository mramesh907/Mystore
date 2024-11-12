import axios from "axios";
import { baseURL } from "../common/SummartApi";

const Axios = axios.create({
        baseURL: baseURL ,
        withCredentials: true,
})
export default Axios