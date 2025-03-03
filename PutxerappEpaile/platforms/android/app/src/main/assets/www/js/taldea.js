import {API_URL} from "./konstanteak.js";
import * as konstanteak from "./konstanteak.js";
import {autentifikatu} from './user.js';
import {getEpailearenEpaimahaiak} from './epaimahaikidea.js';

export const getBaloratuGabekoTaldeak = async () => {
    const idEpaimahaikidea = await getEpailearenEpaimahaiak(autentifikatu());
    try {
        const response = await fetch(`${API_URL}/taldea/${idEpaimahaikidea}/baloratu-gabekoak`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'ngrok-skip-browser-warning': 'true',
                'Content-Type': 'application/json',
            },
        });
        if (response.ok) {
            const data = await response.json();
            const taldeak = [];
            data.forEach(taldea => {
                taldeak.push(new konstanteak.Taldea(taldea.idTaldea, taldea.izena, taldea.email, taldea.telefonoa, taldea.puntuakGuztira, taldea.egoera));
            });
            return taldeak;
        } else {
            return null;
        }
    } catch (err) {
        //console.log(err);
    }
};





