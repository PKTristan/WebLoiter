import { useEffect } from "react";
import { useState } from "react";


function CustomerContextMenu({ channel, position, close, updateChannel, delChannel }) {
    const [name, setName] = useState('');
    const [updateMode, setUpdateMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);


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

    useEffect(() => {
        setName(channel.channel_name);
    }, [channel])

    const handleClick = (e) => {
        e.stopPropagation();
        e.preventDefault();
        const value = e.target.value;

        if (value === 'Edit') {
            setUpdateMode(true);
            setDeleteMode(false);
        }
        else if (value === 'Delete') {
            setDeleteMode(true);
            setUpdateMode(false);
        }
        else if (value === 'Save') {
            setUpdateMode(false);

            const body = {
                channel_name: name,
                server_id: channel.server_id
            }

            updateChannel(body, channel.id);

            close();
        }
        else if (value === 'Cancel') {
            setUpdateMode(false);
            setDeleteMode(false);
        }
        else if (value === 'Confirm') {
            setDeleteMode(false);

            delChannel(channel.id, channel.server_id);

            close();
        }
    }

    const setNameVal = (e) => {
        e.preventDefault();
        const val = e.target.value.replace(' ', '-');

        setName(val);
    }

    useEffect(() => {

    }, [updateMode, deleteMode])

    return (
        <div
            className="custom-context-menu"
            style={{ top: position.y, left: position.x }}
        >
            {!updateMode && !deleteMode &&
                <>
                    <div>{name}</div>
                    <button className="edit-channel-button" value='Edit' onClick={handleClick}>Edit</button>
                    <button className='delete-channel-button' value='Delete' onClick={handleClick} >Delete</button>
                </>
            }

            {updateMode &&
                <>
                    <input className='channel-name' type='text' value={name} onChange={setNameVal} />
                    <button className='save-channel-button' value='Save' onClick={handleClick} >Save</button>
                    <button className='cancel-button' value='Cancel' onClick={handleClick} >Cancel</button>
                </>
            }

            {deleteMode &&
                <>
                    <label className='delete-label'>Are you sure you want to delete?</label>
                <button className='save-channel-button' value='Confirm' onClick={handleClick} >Confirm</button>
                <button className='cancel-button' value='Cancel' onClick={handleClick} >Cancel</button>
                </>
            }
        </div>
    )
}


export default CustomerContextMenu;
