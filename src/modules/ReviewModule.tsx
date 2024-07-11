import { useState } from "react";
import { useAppDispatch } from "../redux/hooks";

export interface FourSwiperRowProps {
    setShowModal: any,
    userInfoList: any,
    mediaList: any
}

export default function ReviewModule({
    setShowModal,
    userInfoList,
    mediaList
}: FourSwiperRowProps) {
    const [content, setContent] = useState<string>('');
    const dispatch = useAppDispatch();
       
   
    return (
      <div>
        
      </div>
    );
};
