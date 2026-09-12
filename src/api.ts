

export interface Name {
    id: number;
    name: string;
}


const API_URL = import.meta.env.VITE_API_URL;


export async function getNames(
    search: string = ""
): Promise<Name[]> {

    const response = await fetch(
        `${API_URL}/api/names?search=${encodeURIComponent(search)}`
    );


    if (!response.ok) {

        throw new Error(
            "Failed to fetch names"
        );
    }


    return response.json();
}


export async function addName(
    name: string
): Promise<Name> {

    const response = await fetch(
        `${API_URL}/api/names`,
        {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                name
            })
        }
    );


    const data: Name | { message: string } =
        await response.json();


    if (!response.ok) {

        if ("message" in data) {
            throw new Error(data.message);
        }

        throw new Error(
            "Failed to add name"
        );
    }


    return data as Name;
}