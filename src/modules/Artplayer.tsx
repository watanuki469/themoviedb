import React, { useEffect, useRef } from 'react';
import Artplayer from 'artplayer';

type ArtplayerOptionsWithoutContainer = Omit<Artplayer['Option'], 'container'>;

interface PlayerProps {
    option: ArtplayerOptionsWithoutContainer;
    getInstance?: (art: Artplayer) => void;
    [key: string]: any; // For the rest props
}

const Player: React.FC<PlayerProps> = ({ option, getInstance, ...rest }) => {
    const artRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const art = new Artplayer({
            ...option,
            container: artRef.current!,
        });

        if (getInstance && typeof getInstance === 'function') {
            getInstance(art);
        }

        return () => {
            if (art && art.destroy) {
                art.destroy(false);
            }
        };
    }, [option, getInstance]);

    return <div ref={artRef} {...rest}></div>;
}

export default Player;
