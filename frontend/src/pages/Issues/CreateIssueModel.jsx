
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { PlusCircle } from "lucide-react";
import { useDispatch } from "react-redux";
import {toast} from "sonner";
import axios from "axios";
import { addIssue } from "../../components/redux/issueSlice";

const CreateIssueModal = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [imgUrl, setImgUrl] = useState("");

  const [formData, setFormData] = useState({
    issueType: "",
    description: "",
    priority: "",
    location: {
      type: "Point",
      coordinates: [0, 0],
    },
    images: "",
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData((prev) => ({
            ...prev,
            location: {
              type: "Point",
              coordinates: [position.coords.longitude, position.coords.latitude],
            },
          }));
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast.error("Could not fetch your location.");
        }
      );
    } else {
      toast.error("Geolocation not supported by your browser.");
    }
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setImgUrl(previewUrl);

    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/upload`,
        uploadData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const uploadedUrl = response.data.fileUrl;
      setFormData((prev) => ({ ...prev, images: uploadedUrl }));
      toast.success("File uploaded successfully!");
    } catch (err) {
      console.error(err);
      toast.error("File upload failed!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(addIssue(formData)).unwrap();
      if (!result || !result.issue || !result.issue._id) {
        throw new Error("Issue reporting failed");
      }
      toast.success("Issue reported successfully!");
      setOpen(false);
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Failed to report issue!");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Report Issue
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Report New Issue</DialogTitle>
          <DialogDescription>
            Describe the issue clearly so the community and authorities can respond.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          {/* Issue Type */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Issue Type</label>
            <Select onValueChange={(val) => setFormData((prev) => ({ ...prev, issueType: val }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select issue type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Waste Management">Waste Management</SelectItem>
                <SelectItem value="Public Transport">Public Transport</SelectItem>
                <SelectItem value="Air Pollution">Air Pollution</SelectItem>
                <SelectItem value="Housing">Housing</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Priority</label>
            <Select onValueChange={(val) => setFormData((prev) => ({ ...prev, priority: val }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select priority level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Low">Low</SelectItem>
                <SelectItem value="Medium">Medium</SelectItem>
                <SelectItem value="High">High</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Description</label>
            <Textarea
              placeholder="Describe the issue in detail"
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Upload Image</label>
            <Input type="file" accept="image/*" onChange={handleFileUpload} />
            {imgUrl && <img src={imgUrl} alt="Preview" className="w-full max-h-64 object-cover mt-2 rounded-lg" />}
          </div>

          {/* Coordinates Display */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Coordinates</label>
            <div className="grid grid-cols-2 gap-2">
              <Input
                type="number"
                placeholder="Longitude"
                value={formData.location.coordinates[0]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: {
                      ...prev.location,
                      coordinates: [parseFloat(e.target.value), prev.location.coordinates[1]],
                    },
                  }))
                }
              />
              <Input
                type="number"
                placeholder="Latitude"
                value={formData.location.coordinates[1]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    location: {
                      ...prev.location,
                      coordinates: [prev.location.coordinates[0], parseFloat(e.target.value)],
                    },
                  }))
                }
              />
            </div>
          </div>

          <Button type="submit" className="w-full mt-4">
            Submit Issue
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateIssueModal;
