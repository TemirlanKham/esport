import axios from 'axios';

const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && user.token){
        return {Authorization: "Bearer " + user.token}
    }
    else{
        return {};
    }
}

export const getMyPlayers = async () => {
    try{
        const response = await axios.get('http://localhost:3005/privatePlayers', 
            { headers: authHeader() }
        )
        return {success: true, data: response.data};

    } catch(error){
        return {success: false, data: error.response.data.error};
    }
}

export const getAllPlayers = async () => {
    try{
        const response = await axios.get('http://localhost:3005/players');
        return {success: true, data: response.data};
    }catch(error){
        return {success: false, data: error.response.data.error};
    }    
}

export const doLogin = async (email, password) => {
    try{
        const response = await axios.post('http://localhost:3005/login', 
            {
                email: email,
                password: password
            },
            { headers: authHeader() }
        )

        localStorage.setItem("user", JSON.stringify(response.data))
        return {success: true, data: "you logged in"}

    }catch(error){
        return {success: false, data: error.response.data.error };
    }
}

export const register = async (email, password, username) => {
    try{
        const response = await axios.post('http://localhost:3005/register',
            {
                email: email,
                password: password,
                username: username
            },
            { headers: authHeader() }
        )
        return {success: true, data: response.data.message};

    }catch(error){
        return {success: false, data: error.response.data.error};
    }
}

export const getPlayersAndCats = async (url) => {

    try {
        console.log(url)
        const [cats, players] = await axios.all([
            axios.get('http://localhost:3005/categories'),
            axios.get(url)
        ]);

        return [cats.data, players.data];
    } catch (error) {
        if (error.response && error.response.status === 404) {
            console.error('Категория с указанным идентификатором не найдена.');
        } else {
            console.error('Произошла ошибка при загрузке данных:', error.message);
        }
        return [null, null];
    }
}

export const deletePlayer = async (playerId) => {
    try{
        const response = await axios.delete(`http://localhost:3005/players/${playerId}`, 
            { headers: authHeader() }
        );

        return {success: true, data: response.data.message};
    
    }catch(error){
        return {success: false, data: error.response.data.error };
    }
}

export const getAllCategories = async () => {
    try{
        const response = await axios.get('http://localhost:3005/categories');
        return {success: true, data: response.data};
    }catch(error){
        return {success: false, data: error.response.data.error};
    }
}

export const getOnePlayer = async (playerId) => {
    try{
        const response = await axios.get(`http://localhost:3005/players/${playerId}`);
        console.log(response)
        return {success: true, data: response.data};
        
    }catch(error){
        return {success: false, data: error.response.data.error};
    }
    
    
}

export const savePlayer = async (player) => {
    try {
        const response = await axios.post('http://localhost:3005/players/create', player,
            { headers: authHeader() });
        return {success: true, data: response.data.message};
    }catch(error){
        return {success: false, data: error.response.data.error};
    }
}

export const updatePlayer = async (player) => {
    try{
        const response = await axios.put('http://localhost:3005/players/'+player.id+'/edit', player,
            { headers: authHeader() }
        );
        console.log(response)
        return {success: true, data: response.data};

    }catch(error){
        return {success: false, data: error.response.data.error};
    }
    
}

export const deleteCat = async (catId) => {
    try{
        console.log(catId)
        const response = await axios.delete(`http://localhost:3005/categories/${catId}`,
            {headers: authHeader() }
        );

        return {success: true, data: response.data.message}
    }catch(error){
        return {success: false, data: error.response.data.error}
    }
}

export const saveCat = async (cat) => {
    try{
        const response = await axios.post('http://localhost:3005/categories', cat,
            { headers: authHeader() }
        );
        return {success: true, data: response.data.message};
        
    
    }catch(error){
        return {success: false, data: error.response.data.error };
    }
}


