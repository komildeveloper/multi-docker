import { Link } from 'react-router-dom'

function OtherPage () {
  return (
    <div className='container'>
      <Link to='/' className='nav-link mt-3 outline text-primary text-center'>Go to Home</Link>
    </div>
  )
}

export default OtherPage;
