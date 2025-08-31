"use client";
import Navbar from "@/components/Navbar";
import { School } from "@/types/School";
import {
  IconCards,
  IconFilter,
  IconSearch,
  IconTable,
  IconTrash,
} from "@tabler/icons-react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ViewSchools() {
  const [schools, setSchools] = useState<School[]>([]);
  const [tab, setTab] = useState<string>("card");
  const [filteredSchools, setFilteredSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState({
    name: "",
    city: "",
    state: "",
  });

  const fetchSchools = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/schools");
      setSchools(response.data);
    } catch (error) {
      console.log("Error fetching schools: ", error);
      toast.error("Error fetching schools");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchools();
  }, []);

  //   Implementing Filter
  useEffect(() => {
    const filtered = schools.filter((school) => {
      return (
        school.name.toLowerCase().includes(searchTerm.name.toLowerCase()) &&
        school.city.toLowerCase().includes(searchTerm.city.toLowerCase()) &&
        school.state.toLowerCase().includes(searchTerm.state.toLowerCase())
      );
    });
    setFilteredSchools(filtered);
  }, [searchTerm, schools]);

  const handleDelete = async (id: string) => {
    try {
      if (!confirm("Are you sure you want to delete this school?")) return;
      const res = axios.delete(`/api/schools/delete?id=${id}`);
      toast.promise(res, {
        loading: "Deleting school...",
        success: "School deleted successfully",
        error: "Error deleting school",
      });
      await res;
      fetchSchools();
    } catch (error) {
      console.log("Error deleting school: ", error);
      toast.error("Error deleting school");
    }
  };

  return (
    <div className="min-h-screen bg-base-100">
      <Navbar />
      <h1 className="font-bold text-3xl text-center uppercase w-full bg-base-200/60 py-6">
        ⭐ View Schools ⭐
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 max-w-7xl mx-auto mt-6">
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Search Schools</legend>
          <label className="input input-primary w-full">
            <IconSearch size={24} />
            <input
              type="search"
              value={searchTerm.name}
              onChange={(e) =>
                setSearchTerm({ ...searchTerm, name: e.target.value })
              }
              placeholder="Search Schools By Name"
            />
          </label>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Select City</legend>
          <select
            className="select select-primary w-full"
            value={searchTerm.city}
            onChange={(e) =>
              setSearchTerm({ ...searchTerm, city: e.target.value })
            }
          >
            <option value="">All Cities</option>
            {Array.from(new Set(schools.map((school) => school.city))).map(
              (city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              )
            )}
          </select>
        </fieldset>
        <fieldset className="fieldset">
          <legend className="fieldset-legend">Select State</legend>
          <select
            className="select select-primary w-full"
            value={searchTerm.state}
            onChange={(e) =>
              setSearchTerm({ ...searchTerm, state: e.target.value })
            }
          >
            <option value="">All States</option>
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
        <div className="space-x-2 flex">
          <button
            className="btn btn-primary mt-8.5"
            onClick={() => {
              setSearchTerm({ name: "", city: "", state: "" });
              fetchSchools();
            }}
          >
            <IconFilter size={20} />
            Clear Filters & Refresh
          </button>
          <button
            className="btn btn-accent mt-8.5"
            onClick={() => setTab(tab === "card" ? "list" : "card")}
          >
            {tab === "card" ? <IconTable size={20} /> : <IconCards size={20} />}
            {tab === "card" ? "List View" : "Card View"}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div className="card bg-base-300 w-96 shadow-sm" key={index}>
                <figure>
                  <div className="h-52 w-full skeleton  animate-pulse" />
                </figure>
                <div className="card-body">
                  <h2 className="h-4 w-32 skeleton animate-pulse rounded" />
                  <p className="h-3 w-48 skeleton animate-pulse rounded" />
                  <p className="h-3 w-24 skeleton animate-pulse rounded" />
                  <p className="h-3 w-28 skeleton animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredSchools.length === 0 ? (
          <div className="text-center mt-10">
            <p className="text-xl skeleton">🚫 No schools found.</p>
          </div>
        ) : tab === "card" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
            {filteredSchools.map((school: School) => (
              <div className="card bg-base-300 w-96 shadow-sm" key={school.id}>
                <figure>
                  <img
                    src={school.image}
                    alt={school.name}
                    className="h-52 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{school.name}</h2>
                  <p>
                    <strong>Address</strong>: {school.address}
                  </p>
                  <p>
                    <strong>City</strong>: {school.city}
                  </p>
                  <p>
                    <strong>State</strong>: {school.state}
                  </p>
                  <div className="card-actions mt-2">
                    <button
                      className="btn btn-error w-full"
                      onClick={() => handleDelete(school.id!)}
                    >
                      <IconTrash size={20} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto mt-4">
            <table className="table table-zebra bg-base-300">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Address</th>
                  <th>City</th>
                  <th>State</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchools.map((school: School, index: number) => (
                  <tr key={school.id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={school.image} alt={school.name} />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{school.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{school.address}</td>
                    <td>{school.city}</td>
                    <td>{school.state}</td>
                    <td>
                      <button
                        className="btn btn-error"
                        onClick={() => handleDelete(school.id!)}
                      >
                        <IconTrash size={20} /> Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
