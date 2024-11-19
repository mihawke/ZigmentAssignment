//funtion to download JSON data.
export const downloadJSON = (data: any, filename = 'formData.json') => {
    // Convert the object to a JSON string
    const jsonString = JSON.stringify(data);

    // Create a Blob from the JSON string
    const blob = new Blob([jsonString], { type: 'application/json' });

    // Create an anchor element to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;

    // Trigger the download
    link.click();
  };