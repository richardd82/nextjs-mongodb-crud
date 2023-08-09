'use client'
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import Swal from 'sweetalert2';

// const loadTasks = async () => {
//   connectDB();
//   const tasks = await Task.find();
//   return tasks;
// }

const AddTask = () => {

  // const tasks = loadTasks();
  const router = useRouter()
  const params = useParams()
  const { register, handleSubmit, setValue, formState: { errors } } = useForm()

  const getTask = async () => {
    const res = await fetch(`/api/tasks/${params.id}`)
    const data = await res.json()
    setValue('title', data.title)
    setValue('description', data.description)
  }

  const createTask = async (data) => {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(
          {
            title: data.title,
            description: data.description
          }
        ),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const data = await res.json()

      return data
    } catch (error) {
      console.log(error)
    }
  }
  const updateTask = async (data) => {
    const res = await fetch(`/api/tasks/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(
        {
          title: data.title,
          description: data.description
        }
      ),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const dat = await res.json()

    return dat    
  }
  const deleteTask = async (id) => {
    Swal.fire({
      title: "Confirm!",
      text: "Are you sure you want to delete this task?",
      icon: "question",
      showCancelButton: true,
      // showConfirmButton: true,
      confirmButtonText: "Delete",
    }).then((value) => {
      if (value.isConfirmed) {
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
        router.push('/');
        router.refresh()
      } else {
        toast.error('Task not deleted');
      }

    });
  }


  const onSubmit = handleSubmit((data) => {
    // e.preventDefault();

    if (params.id) {
      updateTask(data)
      toast.success('Task updated successfully')
    } else {
      createTask(data)
      toast.success('Task created successfully')
    }
    router.push('/');
    router.refresh()
  })

  useEffect(() => {
    // console.log(params)
    // if (params.id) {
    //   const taskFound = tasks.find((t) => t.id === params.id)
    //   console.log('Task found', taskFound)
    //   if (taskFound) {
    //     setValue('title', taskFound.title)
    //     setValue('description', taskFound.description)
    //   }
    // }
    if (params.id) {
      getTask()
    }
  }, [])



  return (
    <div className='flex justify-center items-center h-[calc(70vh-1rem)]'>
      <form onSubmit={onSubmit} className='bg-gray-700 p-10'>
        <header className='flex justify-between'>
          <h1 className='font-bold text-3xl'>{!params.id ? 'New Task' : 'Edit Task'}</h1>
          {params.id &&
            <button type='button' onClick={(e) => deleteTask(params.id)} className='bg-red-700 hover:bg-red-600 px-3 py-1 items-center w-24 h-11 rounded-lg text-center '>Delete</button>
          }
        </header>
        <input placeholder="Write a title" {...register('title', { required: true })} className='bg-gray-800 border-2 rounded-lg my-10 mb-6 py-3 px-4 block focus:outline-none w-full' />
        {errors.title && <span className='block text-red-400 mb-2'>This field is required</span>}
        <textarea placeholder="Write a description" {...register('description', { required: true })} className='bg-gray-800 border-2 rounded-lg  mb-6 py-3 px-4 block focus:outline-none w-full'></textarea>
        {errors.description && <span className='block text-red-400 mb-2'>This field is required</span>}
        <button type='submit' className='bg-green-500 hover:bg-green-400 px-4 py-2 rounded disabled:opacity-30 ml-24'>{!params.id ? 'Save' : 'Update'}</button>
      </form>
    </div>
  )
}

export default AddTask