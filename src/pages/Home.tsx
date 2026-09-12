import {
    useEffect,
    useState
} from "react";

import {
    useNavigate
} from "react-router-dom";

import {
    getNames,
    Name
} from "../api";


function Home() {

    const navigate = useNavigate();


    const [search, setSearch] =
        useState<string>("");


    const [names, setNames] =
        useState<Name[]>([]);


    const [loading, setLoading] =
        useState<boolean>(false);


    const [error, setError] =
        useState<string>("");


    useEffect(() => {

        const timer = setTimeout(
            async () => {

                try {

                    setLoading(true);

                    setError("");


                    const data =
                        await getNames(search);


                    setNames(data);

                } catch (error) {

                    console.error(error);

                    setError(
                        "Unable to load names"
                    );

                } finally {

                    setLoading(false);
                }

            },
            300
        );


        return () => {
            clearTimeout(timer);
        };

    }, [search]);


    return (

        <div className="page">

            <div className="container">


                <div className="header">

                    <h1>
                        Names
                    </h1>


                    <button
                        className="add-button"
                        onClick={() =>
                            navigate("/add")
                        }
                    >
                        + Add Name
                    </button>

                </div>


                <input
                    type="text"
                    className="search-input"
                    placeholder="Search names..."
                    value={search}
                    onChange={(event) =>
                        setSearch(
                            event.target.value
                        )
                    }
                />


                {loading && (
                    <p className="status">
                        Loading...
                    </p>
                )}


                {error && (
                    <p className="error">
                        {error}
                    </p>
                )}


                {!loading &&
                    !error &&
                    names.length === 0 && (

                        <p className="status">
                            No names found
                        </p>
                    )
                }


                <div className="name-list">

                    {names.map(
                        (item: Name) => (

                            <div
                                className="name-item"
                                key={item.id}
                            >
                                {item.name}
                            </div>

                        )
                    )}

                </div>

            </div>

        </div>
    );
}


export default Home;