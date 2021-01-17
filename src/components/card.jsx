import React from 'react';

function Card(props) {
    const data = props.data
    return (
        <div className="sidenav p-2">
            <img className="cardImg text-center" src={data.links.mission_patch_small} alt='' />
            <p className="mt-3 mb-1 missionName">{`${data.mission_name}#${data.flight_number}`}</p>
            <p className="mt-1 mb-1">{`Launch Year : ${data.launch_year}`}</p>
            <p className="mt-1 mb-1">{`Launch Success : ${data.launch_success}`}</p>
        </div>
    );
}

export default Card;