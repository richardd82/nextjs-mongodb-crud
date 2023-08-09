'use client'
import Link from 'next/link.js';
import { useRouter } from 'next/navigation';


const NavBar = ({tasks}) => {
  const router = useRouter();

  return (
    <header className='flex items-center bg-gray-800 px-28 py-3 justify-between'>
      <Link href="/">
        <h1 className='font-bold text-3xl text-white'>Task App
          <span className='text-sm ml-5 text-slate-300'>{tasks.length + " Tasks"}</span>
        </h1>
      </Link>
      <div>
        <button
          onClick={() => router.push('/new')}
          className='bg-green-500 hover:bg-green-400 px-5 py-2 text-gray-50 font-bold
          rounded-2xl inline-flex items-center'>➕Add Task</button>
      </div>
    </header>
  )
}

export default NavBar