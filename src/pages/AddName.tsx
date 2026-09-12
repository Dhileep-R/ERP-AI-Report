import {
    FormEvent,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    addName
} from "../api";


function AddName() {

    const navigate = useNavigate();


    const [name, setName] =
        useState<string>("");


    const [loading, setLoading] =
        useState<boolean>(false);


    const [error, setError] =
        useState<string>("");


    async function handleSubmit(
        event: FormEvent<HTMLFormElement>
    ) {

        event.preventDefault();


        const trimmedName =
            name.trim();


        if (!trimmedName) {

            setError(
                "Please enter a name"
            );

            return;
        }


        try {

            setLoading(true);

            setError("");


            await addName(
                trimmedName
            );


            navigate("/");

        } catch (error) {

            if (error instanceof Error) {

                setError(
                    error.message
                );

            } else {

                setError(
                    "Failed to add name"
                );
            }

        } finally {

            setLoading(false);
        }
    }


    return (

        <div className="page">

            <div className="container">


                <button
                    className="back-button"
                    onClick={() =>
                        navigate("/")
                    }
                >
                    ← Back
                </button>


                <h1>
                    Add Name
                </h1>


                <form
                    onSubmit={handleSubmit}
                >

                    <input
                        type="text"
                        className="search-input"
                        placeholder="Enter name"
                        value={name}
                        onChange={(event) =>
                            setName(
                                event.target.value
                            )
                        }
                    />


                    {error && (

                        <p className="error">
                            {error}
                        </p>

                    )}


                    <button
                        className="submit-button"
                        type="submit"
                        disabled={loading}
                    >
                        {loading
                            ? "Saving..."
                            : "Submit"
                        }
                    </button>

                </form>

            </div>

        </div>
    );
}


export default AddName;