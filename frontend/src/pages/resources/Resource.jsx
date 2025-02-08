import { fetchResources } from "../../components/redux/resourceSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

function Resource() {
    const dispatch=useDispatch();
  const {resources,isLoading}=useSelector((state)=>state.resource);
  console.log(resources);
    useEffect(
        () => {
            dispatch(fetchResources());
        }, []
    );
    return ( 
        <>

            {isLoading? <h1>Loading...</h1>:
                resources.map((resource) => (
                    <div key={resource.id}>
                        <h1>{resource.title}</h1>
                        <p>{resource.description}</p>
                    </div>
                ))
            }
        </>
     );
}

export default Resource;