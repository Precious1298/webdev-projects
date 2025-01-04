import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div>
      <h1 className='text-blue-900 text-center pt-8 text-3xl font-bold font-sans'>
        TRAVEL PLANNER
      </h1>
      <Outlet />
    </div>
  );
}