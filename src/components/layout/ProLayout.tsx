import { useNavigate } from "react-router-dom";
import bg from '../../assets/image.png';
import { handleImageError } from "../../modules/BaseModule";


export default function ProLayout() {
    let navigate = useNavigate()
    
    const Divider = ({ children }: any) => {
        return (
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-500"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="px-4 bg-white text-sm text-gray-700">{children}</span>
                </div>
            </div>
        );
    };
    return (
        <div className="min-h-screen cursor-pointer py-4 px-2">
            <div className="text-black bg-opacity-70 ml-auto mr-auto flex justify-center items-center rounded md:w-5/12 w-10/12  ">
                <div className="bg-white">
                    <div>
                        <div className="flex justify-center items-center ">
                            <div className="" onClick={() => navigate('/')}>
                                <img src="https://m.media-amazon.com/images/G/01/IMDbPro/images/IMDbPro_payments_2x.png"></img>
                            </div>
                        </div>
                        <div className="  justify-center items-center text-left font-bold  px-2 py-2 border-2 border-gray-200 rounded-xl">
                            <p className="lg:text-2xl text-xl">Get the essential resource for entertainment professionals</p>
                            <div className="mt-2 flex items-center gap-2 px-2 py-2 border-2 border-gray-200 rounded-xl">
                                <img
                                    src={`https://m.media-amazon.com/images/G/01/imdbpro/logos/amazon_login_logo._CB1539729833_.png`}
                                    onError={handleImageError}
                                    alt="amazon-logo"
                                    className="align-middle h-[13px] w-[40px] " 
                                />
                                <a href="https://na.account.amazon.com/ap/signin?_encoding=UTF8&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.pape.max_auth_age=0&ie=UTF8&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=lwa&openid.assoc_handle=amzn_lwa_na&marketPlaceId=ATVPDKIKX0DER&arb=896074a4-4e75-4495-8674-bf540c9d384e&language=fr_FR&openid.return_to=https%3A%2F%2Fna.account.amazon.com%2Fap%2Foa%3FmarketPlaceId%3DATVPDKIKX0DER%26arb%3D896074a4-4e75-4495-8674-bf540c9d384e%26language%3Dfr_FR&enableGlobalAccountCreation=1&metricIdentifier=amzn1.application.eb539eb1b9fb4de2953354ec9ed2e379&signedMetricIdentifier=fLsotU64%2FnKAtrbZ2LjdFmdwR3SEUemHOZ5T2deI500%3D">
                                    <div className="flex items-center">
                                        <p className="text-lg font-medium">Join with Amazon</p>
                                    </div>
                                </a>
                            </div>

                            <Divider><p className="text-sm font-light py-2">Already have an account?</p></Divider>
                            <div className="mt-2 flex items-center gap-2 h-12 px-2 py-2 border-2 border-gray-200 rounded-xl" >
                                <img
                                    src={`https://m.media-amazon.com/images/G/01/imdbpro/logos/amazon_login_logo._CB1539729833_.png`}
                                    onError={handleImageError}
                                    alt="movie-img"
                                    className="align-middle h-[13px] w-[40px] " 
                                />
                                <a href="https://na.account.amazon.com/ap/signin?_encoding=UTF8&openid.mode=checkid_setup&openid.ns=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0&openid.claimed_id=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&openid.pape.max_auth_age=0&ie=UTF8&openid.ns.pape=http%3A%2F%2Fspecs.openid.net%2Fextensions%2Fpape%2F1.0&openid.identity=http%3A%2F%2Fspecs.openid.net%2Fauth%2F2.0%2Fidentifier_select&pageId=lwa&openid.assoc_handle=amzn_lwa_na&marketPlaceId=ATVPDKIKX0DER&arb=896074a4-4e75-4495-8674-bf540c9d384e&language=fr_FR&openid.return_to=https%3A%2F%2Fna.account.amazon.com%2Fap%2Foa%3FmarketPlaceId%3DATVPDKIKX0DER%26arb%3D896074a4-4e75-4495-8674-bf540c9d384e%26language%3Dfr_FR&enableGlobalAccountCreation=1&metricIdentifier=amzn1.application.eb539eb1b9fb4de2953354ec9ed2e379&signedMetricIdentifier=fLsotU64%2FnKAtrbZ2LjdFmdwR3SEUemHOZ5T2deI500%3D">
                                    <p className="text-lg font-medium"> Log with Amazon</p>
                                </a>
                            </div>
                            <div className="mt-4 flex items-center gap-2 h-12 px-2 py-2 border-2 border-gray-200 rounded-xl" >
                                <img
                                    src={`https://m.media-amazon.com/images/G/01/imdbpro/logos/imdb_login_logo._CB1539729863_.png`}
                                    onError={handleImageError}
                                    alt="movie-img"
                                    className="align-middle h-[13px] w-[40px] " 
                                />
                                <div>
                                    <p className="text-lg font-medium"> Log in with IMDb</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
            <div className="py-4">
                <Divider></Divider>
                <div className="justify-center py-2">
                    <div className="flex flex-wrap gap-5 justify-center text-green-400">
                        <p className="hover:text-red-400 hover:underline">Help</p>
                        <p className="hover:text-red-400 hover:underline">Subscriber Agreement</p>
                        <p className="hover:text-red-400 hover:underline">Your Ads Privacy Choices</p>
                        <p className="hover:text-red-400 hover:underline">Privacy Policy</p>
                    </div>
                    <div className="flex justify-center">
                        <p>An Amazon company</p>
                    </div>
                    <div className="flex justify-center">
                        <p>   © 1990-2024 IMDb.com, Inc. or its affiliates.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}