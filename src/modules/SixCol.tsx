import FilterIcon from '@mui/icons-material/Filter';

export interface FourSwiperRowProps {
    listRowList: any
}

export default function SixCol({
    listRowList,
}: FourSwiperRowProps) {

    return (
        <div className="relative text-white">
            {listRowList.map((item: any, index: any) => (
                <div key={index}>
                    <div className="relative">
                        <img src={`https://image.tmdb.org/t/p/w500/${item?.poster_path}`} alt="product images" className="h-42" />
                        {index === 0 && (
                            <div className="absolute bottom-0 left-0 p-4 bg-black bg-opacity-50 text-white">
                                <FilterIcon className="w-6 h-6" />
                                <div>Photos</div>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
}
