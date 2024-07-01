import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { AppDispatch } from "../redux/store";
import apiController from "../redux/client/api.Controller.";
import { setListGenre } from "../redux/reducers/genre.reducer";
import { useEffect } from "react";

export default function TopRatedMovieByGenre() {
    const listGenreFromApi = useAppSelector((state) => state.genre.listGenre)
    const dispatch = useAppDispatch();

    const fetchGenre = () => (dispatch: AppDispatch) => {
        apiController.apiGenre.genre('movie')
            .then((data: any) => {
                if (data && data?.genres) {
                    dispatch(setListGenre(data?.genres)); // Adjust the dispatch based on actual response structure
                } else {
                    console.error("API response structure is not as expected.", data);
                }
            })
            .catch((e) => {
                console.log(e);
            });
    };
    useEffect(() => {
        dispatch(fetchGenre());
    }, [dispatch]);
    let navigate = useNavigate()
    const genreMapping: Record<number, string> = listGenreFromApi?.reduce((acc: Record<number, string>, genre: { id: number, name: string }) => {
        acc[genre?.id] = genre?.name;
        return acc;
    }, {});

    return (
        <div className="pt-2">
            <div>
                <div className="flex flex-wrap gap-2 ">
                    {
                        Object.values(genreMapping).map((genre: any,index:any) => (
                            <div
                                onClick={() => navigate(`/search?genres=${genre}`)}
                                className="px-2 py-2 border-2 border-gray-500 bg-white text-sm rounded-full hover:opacity-90 hover:bg-gray-300" key={index}>{genre}</div>
                        ))
                    }
                </div>
            </div>
        </div >
    );
}
