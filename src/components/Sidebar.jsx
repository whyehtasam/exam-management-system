
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="drawer w-fit lg:drawer-open">
  <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col items-center justify-center">
   
   
    <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open drawer</label>
  
  </div> 
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label> 
    <ul className="menu p-5 w-80 min-h-full bg-base-200 text-base-content  space-y-3">
      {/* Sidebar content here */}
    <Link to='/'>
      <button className='btn btn-neutral btn-lg w-full'>Add Subjects</button></Link>
    <Link to='/showSubjects'>
      <button className='btn btn-neutral btn-lg w-full'>Show Subjects</button></Link>
    <Link to='/addQuestions'>
      <button className='btn btn-neutral btn-lg w-full'>Add Questions</button></Link>
    <Link to='/showQuestions'>
      <button className='btn btn-neutral btn-lg w-full'>Show Questions</button></Link>
    <Link to='/prepareSets'>
      <button className='btn btn-neutral btn-lg w-full'>Prepare Sets Ques</button></Link>
      
      
    </ul>
  
  </div>
</div>
  )
}

export default Sidebar