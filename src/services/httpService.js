import axios from "axios";
import { authHeader } from "../helpers/authHeader";

export const HTTP = axios.create({
  baseURL: `http://localhost:8000/api/`,
  headers: authHeader()
});
