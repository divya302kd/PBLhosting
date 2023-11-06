const XHRUtil  = {

     getDataFromApi : async (url) => {

        try {
            const response = await fetch(`${url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                }
            });

            if (response.ok) {
               const result =  await response.json();
               console.log(result);
               return result;
            } else {

            }
        } catch (error) {
            console.error('Network error occurred:', error);
        }
    },

    getDataFromApiWithoutAuth : async (url) => {

        try {
            const response = await fetch(`${url}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.ok) {
                const result =  await response.json();
                console.log(result);
                return result;
            } else {

            }
        } catch (error) {
            console.error('Network error occurred:', error);
        }
    },

    postDataToApi : async (url, formData) => {

        try {
            const response = await fetch(`${url}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('authToken')
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const result =  await response.json();
                console.log(result);
                return result;
            } else {

            }
        } catch (error) {
            console.error('Network error occurred:', error);
        }
    },

    convertDate : (dateString) => {
        let date = new Date(dateString);
        let month = date.toLocaleString('en-US', {month: 'short'});
        let day = date.toLocaleString('en-US',{day: '2-digit'});
        let year = date.getFullYear();
        return month +" "+ day + " " + year
    }
}

export default XHRUtil;
