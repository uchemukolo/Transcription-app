import axios from 'axios';

const API_BASE_URL = 'https://frontend-challenge-backend.vercel.app/api';

export const fetchTranscript = async (id: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transcripts/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Transcript not found');
  }
};
