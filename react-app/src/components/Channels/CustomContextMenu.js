import { useEffect } from "react";

function CustomerContextMenu({ channel, position, close}) {
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                !e.target.closest(".custom-context-menu")
            ) {
                close();
            }
        };

        document.addEventListener("click", handleClickOutside);

        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [close]);

    return (
        <div
            className="custom-context-menu"
            style={{top: position.y, left: position.x}}
        >
            <div>{channel.channel_name}</div>
            <button >Edit</button>
            <button>Delete</button>
        </div>
    )
}


export default CustomerContextMenu;
