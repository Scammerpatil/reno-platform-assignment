"use client";
import Navbar from "@/components/Navbar";
import { School } from "@/types/School";
import axios, { AxiosResponse } from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddSchool() {
  const [school, setSchool] = useState<School>({
    id: "",
    name: "",
    email_id: "",
    contact: "",
    address: "",
    city: "",
    state: "",
    image: "",
  });
  const [schoolImage, setSchoolImage] = useState<File | null>(null);
  const validateForm = () => {
    if (!school.name) {
      toast.error("Please enter school name");
      return false;
    }
    if (!school.email_id) {
      toast.error("Please enter school email");
      return false;
    }
    if (!school.contact) {
      toast.error("Please enter school contact");
      return false;
    }
    if (!school.address) {
      toast.error("Please enter school address");
      return false;
    }
    if (!school.city) {
      toast.error("Please enter school city");
      return false;
    }
    if (!school.state) {
      toast.error("Please enter school state");
      return false;
    }
    if (!school.image) {
      toast.error("Please upload school image");
      return false;
    }
    if (!school.contact.match(/^[0-9]{10}$/)) {
      toast.error("Please enter a valid 10-digit contact number");
      return false;
    }
    if (!school.email_id.match(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)) {
      toast.error("Please enter a valid email address");
      return false;
    }
    return true;
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    // Handle form submission
    const res = axios.post("/api/schools/add-school", { school });
    toast.promise(res, {
      loading: "Adding School...",
      success: () => {
        setSchool({
          id: "",
          name: "",
          email_id: "",
          contact: "",
          address: "",
          city: "",
          state: "",
          image: "",
        });
        return "School Added Successfully";
      },
      error: (err) => {
        console.error(err);
        return "Error Adding School";
      },
    });
  };
  const handleImageUpload = (
    folderName: string,
    imageName: string,
    path: string
  ) => {
    if (!school.name) return toast.error("Please enter school name first");
    if (!schoolImage) return toast.error("Please upload an image");
    try {
      if (schoolImage.size > 1048576)
        return toast.error("Image size should be less than 1MB");
      const imageResponse = axios.postForm("/api/helper/upload-img", {
        file: schoolImage,
        name: imageName,
        folderName: folderName,
      });
      toast.promise(imageResponse, {
        loading: "Uploading Image...",
        success: (data: AxiosResponse) => {
          setSchool({
            ...school,
            [path]: data.data.fileUrl,
          });
          return "Image Uploaded Successfully";
        },
        error: (err: unknown) => `This just happened: ${err}`,
      });
    } catch (error) {
      console.log("Error uploading image: ", error);
      toast.error("Error uploading image");
    }
  };
  return (
    <div className="h-screen bg-base-200">
      <Navbar />
      <h1 className="font-bold text-3xl text-center uppercase w-full bg-base-200/60 py-6">
        ⭐ Add School ⭐
      </h1>
      <section className="max-w-7xl mx-4 lg:mx-auto mt-2">
        <form
          action="post"
          className="p-4 lg:p-10 border border-base-content rounded-2xl shadow-2xl bg-base-300 lg:space-y-4"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 lg:gap-6">
            {/* Name */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-base capitalize">
                What is the name of the school ?{" "}
                <span className="text-error">*</span>
              </legend>
              <input
                type="text"
                className="input input-primary w-full"
                placeholder="Type school name"
                value={school.name}
                onChange={(e) => setSchool({ ...school, name: e.target.value })}
              />
            </fieldset>
            {/* Email */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-base capitalize">
                What is the email ID of the school ?{" "}
                <span className="text-error">*</span>
              </legend>
              <input
                type="email"
                className="input input-primary w-full"
                placeholder="Type school email"
                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$"
                value={school.email_id}
                onChange={(e) =>
                  setSchool({ ...school, email_id: e.target.value })
                }
              />
            </fieldset>
            {/* Contact */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-base capitalize">
                What is the contact number of the school ?{" "}
                <span className="text-error">*</span>
              </legend>
              <input
                type="tel"
                className="input input-primary w-full"
                placeholder="Type school contact number"
                value={school.contact}
                min={10}
                max={10}
                pattern="[0-9]{10}"
                onChange={(e) =>
                  setSchool({ ...school, contact: e.target.value })
                }
              />
            </fieldset>
          </div>
          {/* Address */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base capitalize">
              What is the address of the school ?{" "}
              <span className="text-error">*</span>
            </legend>
            <textarea
              className="textarea textarea-primary w-full"
              placeholder="Type school address"
              value={school.address}
              onChange={(e) =>
                setSchool({ ...school, address: e.target.value })
              }
            />
          </fieldset>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* City */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-base capitalize">
                What is the city of the school ?{" "}
                <span className="text-error">*</span>
              </legend>
              <input
                type="text"
                className="input input-primary w-full"
                placeholder="Type school city"
                value={school.city}
                onChange={(e) => setSchool({ ...school, city: e.target.value })}
              />
            </fieldset>
            {/* State */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend text-base capitalize">
                What is the state of the school ?{" "}
                <span className="text-error">*</span>
              </legend>
              <select
                className="select select-primary w-full"
                value={school.state}
                onChange={(e) =>
                  setSchool({ ...school, state: e.target.value })
                }
              >
                <option value="">Select state</option>
                {[
                  "Andhra Pradesh",
                  "Arunachal Pradesh",
                  "Assam",
                  "Bihar",
                  "Chhattisgarh",
                  "Goa",
                  "Gujarat",
                  "Haryana",
                  "Himachal Pradesh",
                  "Jharkhand",
                  "Karnataka",
                  "Kerala",
                  "Madhya Pradesh",
                  "Maharashtra",
                  "Manipur",
                  "Meghalaya",
                  "Mizoram",
                  "Nagaland",
                  "Odisha",
                  "Punjab",
                  "Rajasthan",
                  "Sikkim",
                  "Tamil Nadu",
                  "Telangana",
                  "Tripura",
                  "Uttar Pradesh",
                  "Uttarakhand",
                  "West Bengal",
                ].map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </fieldset>
          </div>
          {/* Image URL */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend text-base capitalize">
              Give an image of your school <span className="text-error">*</span>
            </legend>
            <div className="flex gap-2">
              <input
                type="file"
                className="file-input file-input-primary w-full"
                onChange={(e) => {
                  const file = e.target.files?.[0] || null;
                  setSchoolImage(file);
                }}
              />
              <button
                className="btn btn-primary"
                onClick={() =>
                  handleImageUpload("schoolImages", school.name, "image")
                }
                type="button"
                disabled={!schoolImage}
              >
                Upload Image
              </button>
            </div>
          </fieldset>
          <button type="submit" className="btn btn-accent w-full mt-4">
            Submit
          </button>
        </form>
      </section>
    </div>
  );
}
