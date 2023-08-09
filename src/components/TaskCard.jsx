'use client'
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Swal from "sweetalert2";


const TaskCard = ({ tasks }) => {
    const router = useRouter()
    // console.log(tasks)
    const deleteTask = async (id) => {
        Swal.fire({
            title: "Confirm!",
            text: "Are you sure you want to delete this task?",
            icon: "question",
            showCancelButton: true,
            // showConfirmButton: true,
            confirmButtonText: "Delete",
          }).then((value) => {
            if(value.isConfirmed){
                try {
                    const res = fetch(`/api/tasks/${id}`, {
                        method: 'DELETE',
                    })
                    const data = res.json()
                    console.log(data)
                } catch (error) {
                    console.log(error)
                }
                toast.success('Task deleted successfully')
                router.refresh()
             }else{ 
              toast.error('Task not deleted');
            }
            
          });        
    }
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric'};                  
    return (
        <div>
            {tasks.map((t) => (
                <div key={t._id} className='bg-gray-700 hover:bg-slate-600 cursor-pointer px-20 py-5 m-2 flex justify-between'>
                    <div onClick={() => router.push(`/edit/${t._id}`)}>                        
                            <h1>{t.title}</h1>
                            <p className='text-gray-300'>{t.description}</p>
                            <p><span>Created at: </span>{new Date(t.createdAt).toLocaleDateString('es', options)}</p>
                            <span className='text-gray-400 text-xs'>{t._id}</span>
                    </div>
                    <button onClick={(e) => deleteTask(t._id)} className='bg-red-700 hover:bg-red-600 px-3 items-center w-24 h-11 rounded-lg text-center mt-2'>Delete</button>
                </div>
            ))}
        </div>
    )
}

export default TaskCard