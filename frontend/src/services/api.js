const API_URL = 'http://localhost:8000/api';

export const api = {
    uploadFile: async (file, userId) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('user_id', userId);

        const response = await fetch(`${API_URL}/upload`, {
            method: 'POST',
            body: formData,
        });
        return response.json();
    },

    getGarden: async (userId) => {
        const response = await fetch(`${API_URL}/garden/${userId}`);
        return response.json();
    },

    getQuiz: async (topic) => {
        const response = await fetch(`${API_URL}/quiz/${topic}`);
        return response.json();
    },

    submitQuiz: async (result) => {
        const response = await fetch(`${API_URL}/quiz/submit`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(result),
        });
        return response.json();
    }
};
