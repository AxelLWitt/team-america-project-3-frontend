import React from 'react'

const ShowModal = ({show, id}) => {
    //will accept certain params to change the modal ie update the post, create the post, show the post
    // const event = {
    //     try()
    // }

    if(!show){
        return
    }
    return(
        <div className='ShowModal'>
            <p>{id}</p>
        </div>
    )
}

export default ShowModal