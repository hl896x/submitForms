import React from 'react'


const PropertyReport = (props) => {
    


    return(
        <>
        <h3 className="mt-3">Submition Details:{props.notice}</h3>
          <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">EmailAdd</th>
              <th scope="col">Phone</th>
              <th scope="col">Added QA</th>
            </tr>
          </thead>
          <tbody>
              {console.log("props:", props)}
            {console.log("this.state:",props.thisState )}
          {props.thisState.data.map((result) => {
            console.log("result:", result);
              return (
              <tr>
                
                <td>{result.Name}</td>
                <td>{result.EmailAdd}</td>
                <td>{result.Phone}</td>
                <td>
                  
                  {result.Experiment.map(e=>
                    <div>
                      Question:{e.questionTitle}
                    <br/>
                      Answer: {e.answer}
                    </div>
                  )}

                </td>
              </tr>
              )})}
           
          </tbody>
        </table>
        </>
    )
}

export default PropertyReport;