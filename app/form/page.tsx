"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const interestsOptions = [
  "Sports",
  "Movies",
  "Traveling",
  "Music",
  "Reading",
  "Cooking",
  "Gaming",
  "Fitness",
  "Photography",
  "Technology",
];

const statesInMalaysia = [
  "Johor",
  "Kedah",
  "Kelantan",
  "Melaka",
  "Negeri Sembilan",
  "Pahang",
  "Perak",
  "Perlis",
  "Pulau Pinang",
  "Sabah",
  "Sarawak",
  "Selangor",
  "Terengganu",
  "Kuala Lumpur",
  "Labuan",
  "Putrajaya",
];

const universities = [
  "Universiti Teknologi MARA",
  "Universiti Malaya",
  "Management and Science University",
];

const AddUser = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [university, setUniversity] = useState("");
  const [gender, setGender] = useState("");
  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setGender(e.target.value);
    setProfilePictureUrl(
      e.target.value === "female"
        ? "https://xsgames.co/randomusers/avatar.php?g=female"
        : "https://xsgames.co/randomusers/avatar.php?g=male"
    );
  };

  const handleInterestChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    if (checked) {
      setInterests([...interests, value]);
    } else {
      setInterests(interests.filter((interest) => interest !== value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const userData = {
      username,
      email: session?.user?.email,
      university,
      gender,
      profile_picture_url: profilePictureUrl,
      location,
      interests: interests.join(", "),
    };

    try {
      const response = await fetch("/api/addUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess(true);
        router.push("/user");
      } else {
        setError(data.error);
      }
    } catch (error) {
      setError("An error occurred while submitting the form.");
    }
  };

  return (
    <div className="flex justify-center items-center w-screen w-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-2xl space-y-6"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Add User Form</h1>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 mb-4">User added successfully!</p>
        )}
        <div>
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          />
        </div>
        <div>
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="university"
          >
            University
          </label>
          <select
            id="university"
            value={university}
            onChange={(e) => setUniversity(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Select your university</option>
            {universities.map((uni) => (
              <option key={uni} value={uni}>
                {uni}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="gender"
          >
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={handleGenderChange}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Select your gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="location"
          >
            Location
          </label>
          <select
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
            required
          >
            <option value="">Select your state</option>
            {statesInMalaysia.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="interests"
          >
            Interests
          </label>
          <div className="grid grid-cols-2 gap-2">
            {interestsOptions.map((interest) => (
              <label key={interest} className="inline-flex items-center">
                <input
                  type="checkbox"
                  value={interest}
                  checked={interests.includes(interest)}
                  onChange={handleInterestChange}
                  className="form-checkbox"
                />
                <span className="ml-2">{interest}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;
