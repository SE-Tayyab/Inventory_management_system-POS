import React from 'react'
import '../style/loading.css'
function Loading() {
  return (

<div className='spinner'>
<button className="btn btn-primary" type="button" disabled>
  <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true" />
  Loading...
</button>
</div>

  )
}

export default Loading