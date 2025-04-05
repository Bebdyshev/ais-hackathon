"use client"

import type React from "react"

import { useState, useRef } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MascotIcon } from "@/components/ui/mascot-icon"
import { Camera, Plus, Upload, X } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface AddStudentDialogProps {
  onStudentAdded?: (student: any) => void
}

export function AddStudentDialog({ onStudentAdded }: AddStudentDialogProps) {
  const [open, setOpen] = useState(false)
  const [studentId, setStudentId] = useState("")
  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [studentClass, setStudentClass] = useState("")
  const [photoUrl, setPhotoUrl] = useState("")
  const [isUploading, setIsUploading] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)

    // Create a local object URL for the file
    const objectUrl = URL.createObjectURL(file)
    setPhotoUrl(objectUrl)
    setIsUploading(false)
  }

  const handleRemovePhoto = () => {
    setPhotoUrl("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!studentId || !fullName || !email || !studentClass) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    // Create new student object
    const newStudent = {
      id: studentId,
      name: fullName,
      email,
      class: studentClass,
      avatar: photoUrl || undefined,
      status: "Active",
      points: 0,
      streak: 0,
      attendanceRate: "0%",
    }

    // Call the callback function if provided
    if (onStudentAdded) {
      onStudentAdded(newStudent)
    }

    // Show success message
    toast({
      title: "Student Added",
      description: `${fullName} has been successfully added.`,
      variant: "default",
    })

    // Reset form and close dialog
    resetForm()
    setOpen(false)
  }

  const resetForm = () => {
    setStudentId("")
    setFullName("")
    setEmail("")
    setStudentClass("")
    setPhotoUrl("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen)
        if (!newOpen) resetForm()
      }}
    >
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Add Student
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MascotIcon className="h-5 w-5" />
            Add New Student
          </DialogTitle>
          <DialogDescription>Enter student details and upload a photo.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="grid grid-cols-2 gap-8">
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-full h-full">
                {photoUrl ? (
                  <div className="group relative h-96 w-96 overflow-hidden rounded-lg border-2 border-primary">
                    <img src={photoUrl} alt="Student photo" className="h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100" />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute inset-0 m-auto h-10 w-10 rounded-full p-0 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-white/20"
                      onClick={handleRemovePhoto}
                    >
                      <X className="h-6 w-6 text-white" />
                    </Button>
                  </div>
                ) : (
                  <div className="relative h-[300px] w-full rounded-lg border-2 border-dashed border-primary/30 bg-secondary/10">
                    <div className="flex h-full flex-col items-center justify-center gap-4">
                      <Camera className="h-24 w-24 text-primary/30" />
                      <input
                        type="file"
                        accept="image/*"
                        id="photo-upload"
                        ref={fileInputRef}
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="gap-2 text-lg"
                      >
                        {isUploading ? (
                          <>Uploading...</>
                        ) : (
                          <>
                            <Upload className="h-4 w-4" />
                            Upload Photo
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="student-id">Student ID</Label>
                  <Input
                    id="student-id"
                    placeholder="e.g., S12345"
                    value={studentId}
                    onChange={(e) => setStudentId(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="student-class">Class</Label>
                  <Select value={studentClass} onValueChange={setStudentClass} required>
                    <SelectTrigger id="student-class">
                      <SelectValue placeholder="Select class" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12A">Class 12A</SelectItem>
                      <SelectItem value="12B">Class 12B</SelectItem>
                      <SelectItem value="11A">Class 11A</SelectItem>
                      <SelectItem value="11B">Class 11B</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="full-name">Full Name</Label>
                <Input
                  id="full-name"
                  placeholder="Enter student's full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@student.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <DialogFooter className="sm:justify-end">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Student</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

