import React from 'react'

function SaleStatistics() {
  return (
    <div className='col-xl-6 col-lg-12'>
      <div className='card-mb-4'>
        <article className='card-bpdy'>
            <h4 className='card-title' style={{marginLeft:"20px"}}>Sale Statistics</h4>
            <br></br>
                <iframe style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                width:"925px" ,
                height:"350px" ,
                marginLeft:"20px",
            }}
                src="https://charts.mongodb.com/charts-products_selling_system-mxmqn/embed/charts?id=65429c18-7a93-4eb1-8bd1-d08afb6b5fd3&maxDataAge=300&theme=light&autoRefresh=true">
            </iframe>

        </article>

      </div>

    </div>
  )
}

export default SaleStatistics
