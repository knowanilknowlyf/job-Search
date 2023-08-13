import React from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export const deleteAction = async({params})=>{
    console.log(params)
    try {
        await customFetch.delete(`/jobs/${params.id}`)
        toast.success("deleted successfully")

    } catch (error) {
        toast.error(error?.response?.data?.msg)
    }
    return redirect('../all-jobs')
}

