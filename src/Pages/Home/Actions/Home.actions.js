import { getCrops } from "../../../Http";

export const getCropsAction = async () => {
    try {
        let response = await getCrops();
        let crops = response.data.data;
        return crops
    } catch (error) {
        throw error; 
    }
}