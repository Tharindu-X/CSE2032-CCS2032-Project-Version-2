// @ts-ignore
import React, { useState } from "react";

type Job = {
  title: string;
  type: string;
  category: string;
  location: string;
  tags?: string;
  closingDate: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
};

export default function AddJob() {
  const [form, setForm] = useState<Job>({
    title: "",
    type: "",
    category: "",
    location: "",
    tags: "",
    closingDate: "",
    description: "",
    requirements: [],
    responsibilities: [],
  });
  const [reqInput, setReqInput] = useState("");
  const [resInput, setResInput] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  function setField<K extends keyof Job>(k: K, v: Job[K]) {
    setForm(prev => ({ ...prev, [k]: v }));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.title.trim()) e.title = "Job title is required";
    if (!form.type) e.type = "Select a job type";
    if (!form.category) e.category = "Select a category";
    if (!form.location.trim()) e.location = "Location is required";
    if (!form.closingDate) e.closingDate = "Closing date is required";
    if (!form.description.trim()) e.description = "Description is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function submit() {
    if (!validate()) return;
    alert("Job posted!");
  }

  return (
    <section className="mx-auto max-w-5xl px-4 pt-24 pb-12">
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => history.back()} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border text-slate-700 hover:bg-slate-100 transition">← Back to Dashboard</button>
          <div className="hidden sm:flex items-center gap-2">
            <div className="w-9 h-9 rounded-full bg-indigo-600 text-white grid place-items-center">CG</div>
            <span className="font-semibold text-slate-800">Grag Gig</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn btn-outline">Save as Draft</button>
          <button onClick={submit} className="btn btn-primary">Publish Job</button>
        </div>
      </header>

      <div className="text-center mt-6 mb-6">
        <h1 className="text-3xl md:text-4xl font-extrabold">Post New Job</h1>
        <p className="text-slate-600">Fill in the details below to create your job posting</p>
      </div>

      <div className="rounded-2xl bg-white shadow p-6 border">
        <div className="flex items-center gap-3 pb-4 mb-4 border-b">
          <div className="w-10 h-10 rounded-lg grid place-items-center text-white bg-gradient-to-br from-indigo-600 to-purple-600">ℹ️</div>
          <h2 className="text-lg font-semibold">Basic Information</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold mb-1">Job Title *</label>
            <input className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${errors.title ? "ring-2 ring-rose-500" : "focus:ring-indigo-500"}`} value={form.title} onChange={e=>setField("title", e.target.value)} placeholder="e.g. Senior Software Engineer"/>
            {errors.title && <div className="text-sm text-rose-600 mt-1">{errors.title}</div>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Job Type *</label>
            <div className="relative">
              <select className={`w-full appearance-none rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${errors.type ? "ring-2 ring-rose-500" : "focus:ring-indigo-500"}`} value={form.type} onChange={e=>setField("type", e.target.value)}>
                <option value="">Select job type</option>
                <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Freelance</option><option>Internship</option>
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6,9 12,15 18,9" /></svg>
            </div>
            {errors.type && <div className="text-sm text-rose-600 mt-1">{errors.type}</div>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Job Category *</label>
            <div className="relative">
              <select className={`w-full appearance-none rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${errors.category ? "ring-2 ring-rose-500" : "focus:ring-indigo-500"}`} value={form.category} onChange={e=>setField("category", e.target.value)}>
                <option value="">Select job category</option>
                <option>Technology</option><option>Education</option><option>Healthcare</option><option>Finance</option><option>Design</option><option>Other</option>
              </select>
              <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6,9 12,15 18,9" /></svg>
            </div>
            {errors.category && <div className="text-sm text-rose-600 mt-1">{errors.category}</div>}
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Job Location *</label>
            <input className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${errors.location ? "ring-2 ring-rose-500" : "focus:ring-indigo-500"}`} value={form.location} onChange={e=>setField("location", e.target.value)} placeholder="e.g. New York, NY or Remote"/>
            {errors.location && <div className="text-sm text-rose-600 mt-1">{errors.location}</div>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Job Description *</label>
            <textarea className={`w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 ${errors.description ? "ring-2 ring-rose-500" : "focus:ring-indigo-500"}`} rows={6} value={form.description} onChange={e=>setField("description", e.target.value)} placeholder="Describe the role, responsibilities..."/>
            {errors.description && <div className="text-sm text-rose-600 mt-1">{errors.description}</div>}
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Requirements *</label>
            <div className="flex gap-3">
              <input className="flex-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" value={reqInput} onChange={e=>setReqInput(e.target.value)} placeholder="Add a requirement (e.g. Bachelor's degree in CS)"/>
              <button type="button" onClick={()=>{ if(reqInput.trim()) { setField("requirements", [...form.requirements, reqInput.trim()]); setReqInput(""); } }} className="btn btn-primary">Add</button>
            </div>
            <ul className="mt-3 space-y-1">{form.requirements.map((r,i)=><li key={i} className="list-item">{r}</li>)}</ul>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-semibold mb-1">Responsibilities *</label>
            <div className="flex gap-3">
              <input className="flex-1 rounded-lg border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" value={resInput} onChange={e=>setResInput(e.target.value)} placeholder="Add a responsibility (e.g. Lead feature development)"/>
              <button type="button" onClick={()=>{ if(resInput.trim()) { setField("responsibilities", [...form.responsibilities, resInput.trim()]); setResInput(""); } }} className="btn btn-primary">Add</button>
            </div>
            <ul className="mt-3 space-y-1">{form.responsibilities.map((r,i)=><li key={i} className="list-item">{r}</li>)}</ul>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6">
          <button className="btn btn-outline">Save as Draft</button>
          <button onClick={submit} className="btn btn-primary">Publish Job</button>
        </div>
      </div>
    </section>
  );
}
