
import React from "react";
const PersonProfileIcon: React.FC<{ onClick: () => void }> = ({ onClick }) => {
    return (
        <div>
            <button onClick={onClick}>
                <div className="rounded-full overflow-hidden"></div>
                <p>Ngo Doan Duy Long</p>
            </button>
        </div>
    );
}
export default PersonProfileIcon;