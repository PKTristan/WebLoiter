import './ServerMembers.css'

function ServerMembers({members}) {


    return (
        <ul className='server-members'>
        {
            members.map(member => {
                return (
                    <li key={member.id} className='member-list'>
                        <img src={member.profile_pic} alt={member.display_name} className='member-images' key={member.id} />
                        {member.display_name}
                    </li>
                )
            })
        }
        </ul>
    )
}

export default ServerMembers;
