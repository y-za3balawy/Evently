import React, { startTransition, useEffect, useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ICategory } from '@/lib/database/models/category.model'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import { Input } from '../ui/input'
import { createCategory, getAllCategories } from '@/lib/actions/category.action'
    

type DropdownProps ={
    value?:string ,
    onChangeHandler?:()=>void 
}


function Dropdown({value , onChangeHandler}:DropdownProps) {
  const [category, setCategories] = useState<ICategory[]>([])
  const [Newcategory, setNewcategory] = useState('')

  const handleAddCategory = () => {
    createCategory({
      categoryName: Newcategory.trim()
    })
      .then((category) => {
        setCategories((prevState) => [...prevState, category])
      })
  }

  useEffect(  ()=>{

    const getCategory = async()=>{
      const categoriesList = await getAllCategories()
      
      categoriesList && setCategories(categoriesList as ICategory[])

    }
    getCategory()
  } ,[])



    return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
    <SelectTrigger className="select-field">
      <SelectValue placeholder="category" />
    </SelectTrigger>
    <SelectContent>
      {category.length>0 && category.map((category)=>(
      <SelectItem value={category._id}  key={category._id}
      className='select-item p-regular-14 '
      >{category.name}</SelectItem>

      ))}

<AlertDialog>
  <AlertDialogTrigger className=' p-medium-14 flex w-full rounded-sm py-3 pl-8  text-primary-500 
    hover:bg-primary-50  focus:text-primary-500'>Add New Category</AlertDialogTrigger>
  <AlertDialogContent className='bg-white'>
    <AlertDialogHeader>
      <AlertDialogTitle>New Category</AlertDialogTitle>
      <AlertDialogDescription >
        <Input type='text' placeholder='category name' className='input-feild 
        mt-3 ' onChange={(e)=>( setNewcategory(e.target.value))}/>
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel>Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={()=>startTransition(handleAddCategory)}>Add</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>

    </SelectContent>
  </Select>
  
  )
}

export default Dropdown