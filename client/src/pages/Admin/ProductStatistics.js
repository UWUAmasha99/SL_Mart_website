import React from 'react';

function ProductStatistics() {
  return (
    <div className='row' style={{marginRight:"20px"}}>
      <div className='col-xl-6 col-lg-6'>
        <div className='card mb-4'>
          <article className='card-body'>
            <h4 className='card-title'>Product Statistics</h4>
            <br></br>
            <iframe
              style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                width: "100%",
                height: "350px",
              }}
              src="https://charts.mongodb.com/charts-products_selling_system-mxmqn/embed/charts?id=65444f33-9770-4c53-8585-702be508cab6&maxDataAge=300&theme=light&autoRefresh=true"
            ></iframe>
          </article>
        </div>
      </div>

      <div className='col-xl-6 col-lg-6'>
        <div className='card mb-4'>
          <article className='card-body'>
            <h4 className='card-title'>Category Names</h4>
            <br></br>
            <iframe
              style={{
                background: "#FFFFFF",
                border: "none",
                borderRadius: "2px",
                boxShadow: "0 2px 10px 0 rgba(70, 76, 79, .2)",
                width: "100%",
                height: "350px",
              }}
              src="https://charts.mongodb.com/charts-products_selling_system-mxmqn/embed/charts?id=65447b3f-1a0e-40ad-8347-b6697984eb13&maxDataAge=300&theme=light&autoRefresh=true"
            ></iframe>
          </article>
        </div>
      </div>
    </div>
  );
}

export default ProductStatistics;
