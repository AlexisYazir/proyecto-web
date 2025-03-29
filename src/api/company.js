//estas constantes las uso en auth Context  y las mando al backend
//
import axios from './axios'

//para registro de usuarios por administrador
export const updateMisionVisionRequest = (datos) => axios.post(`/update-company`, datos)
//OK
export const addPolicieRequest = (policie) => axios.post("/add-policie", policie)

//OK
export const getCompanyRequest = () => axios.get("/company")

//OK
export const getFaqsRequest = () => axios.get("/faq")
