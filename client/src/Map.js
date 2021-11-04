import React, { useEffect, useRef, useState } from "react"
function Map({ onClick,
    onIdle,
    children,
    center,
    zoom,
    ...options }) {

    const [map, setMap] = useState();
    const ref = useRef(null);
    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, { center, zoom }))
        }
    }, [ref, map, center, zoom]);
    useEffect(() => {
        if (map) {
            map.setCenter(center)
        }
    }, [map, center])

    return (
        <div>
            <div ref={ref} style={{
                width: "50vw",
                height: "50vh",
            }} />
            {
                React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        // set the map prop on the child component
                        return React.cloneElement(child, { map });
                    }
                })
            }
        </div>
    );
}

export default Map;
