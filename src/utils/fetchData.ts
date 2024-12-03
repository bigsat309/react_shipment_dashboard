export const fetchJSON = async (fileName: string) => {
    const response = await fetch(`/assets/${fileName}`);
    return await response.json();
};
