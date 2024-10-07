"use client"
import React, { useState } from 'react'
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LoaderCircle } from 'lucide-react';

const AddNewInterview = () => {
  const [dialog, setDialog] = useState(false)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    role: '',
    jd: '',
    years: ''
  })

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  // Handle form submission
  const handleSubmit = async (e) => {
   setLoading(true)
    e.preventDefault()
    console.log("User Details:", formData)
    const {role,jd,years}=formData
    console.log(role,jd,years)
    try{
        const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const prompt = `Please give me 10 question for a who is going for interview and his or her role is ${role} and jd is ${jd} and he or she has experience of ${years} years along with answers in json format. Dont add any note or title nothing.`;


const result = await model.generateContent(prompt);
const ques = (result.response.text()).replace("```json","").replace("```","")
console.log(JSON.parse(ques));
setLoading(false)


    }
    catch(e){
        console.log(e)
    }

    
  }

  return (
    <div>
      <div className='pl-[80px]'>
        <h1 className='font-bold text-[24px]'>Dashboard</h1>
        <p>Take your first AI mockup interview</p>
        <br />
        <br />
        <p 
          onClick={() => { setDialog(true) }} 
          className='border border-red-500 text-center w-[200px] px-10 py-10 cursor-pointer'
        >
          + Add New
        </p>
        
        <Dialog open={dialog}>
          <DialogTrigger></DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tell us more about your job</DialogTitle>
              <DialogDescription>
                Please fill in the following details to begin your AI mock interview:
                <br />
                <form onSubmit={handleSubmit} className='mt-4 space-y-4'>
                  <div>
                    <label className='block text-sm font-medium'>Job Role</label>
                    <input 
                      type="text" 
                      name="role" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      className='w-full border border-gray-300 p-2 rounded'
                      placeholder='Fullstack Developer'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium'>Job Description/Tech Stack(In Short)</label>
                    <input 
                      type="text" 
                      name="jd" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      className='w-full border border-gray-300 p-2 rounded'
                      placeholder='React, Express, Javascript'
                      required
                    />
                  </div>
                  <div>
                    <label className='block text-sm font-medium'>Years of Experience</label>
                    <input 
                      type="text" 
                      name="years" 
                      value={formData.jobTitle} 
                      onChange={handleInputChange} 
                      className='w-full border border-gray-300 p-2 rounded'
                      placeholder='8'
                      required
                    />
                  </div>
                  <div className='flex justify-end mt-6'>
                    <button 
                      type="button" 
                      onClick={() => { setDialog(false) }} 
                      className='border border-gray-400 px-4 py-2 rounded mr-4'
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className='bg-blue-500 text-white px-4 py-2 rounded'
                      disabled={loading}
                    > 

                         {loading?<>Generating <LoaderCircle className='animate-spin inline'/></>:"Start"}
                         
                      
                    </button>
                  </div>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

export default AddNewInterview
