import { pdfApiKey } from "../config/dopboxToken";

export async function uploadFileToPDFco(file) {
    const apiKey = pdfApiKey;
    const url = 'https://api.pdf.co/v1/file/upload';

    // Create FormData object
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'x-api-key': apiKey
            },
            body: formData
        });

        if (!response.ok) {
            throw new Error('Error uploading file to PDF.co');
        }

        const data = await response.json();
        console.log('File uploaded successfully:', data);
        return data;
    } catch (error) {
        console.error('Error uploading file to PDF.co:', error);
        throw error;
    }
}

