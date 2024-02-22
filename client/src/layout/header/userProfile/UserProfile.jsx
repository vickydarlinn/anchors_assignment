import React, { useState, useContext } from "react";
import profile from "../../../assets/profile.jpg";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { MdOutlineSavedSearch, MdLogout } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { UserInfoContext } from "../../../context/userInfoContext";

const UserProfile = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { userInfo } = useContext(UserInfoContext);

	return (
		<div className="relative">
			<div
				onClick={() => setIsModalOpen(!isModalOpen)}
				className="flex items-center border p-2 px-3 rounded-lg gap-4 cursor-pointer relative"
			>
				<img src={profile} alt="profile pic" className="rounded-full w-10" />
				<p>{userInfo?.name ? userInfo.name : "User"}</p>
				{isModalOpen ? <FaChevronUp /> : <FaChevronDown />}
			</div>
			{isModalOpen && (
				<ProfileModal
					setIsModalOpen={setIsModalOpen}
					isModalOpen={isModalOpen}
				/>
			)}
		</div>
	);
};

export default UserProfile;

function ProfileModal({ setIsModalOpen, isModalOpen }) {
	const navigate = useNavigate();
	const { updateIsUserLoggedIn } = useContext(UserInfoContext);
	return (
		<div className="bg-[#181326] flex flex-col justify-center border rounded-lg absolute -bottom-48 z-20">
			<Link
				to="/profile/personal-details"
				onClick={() => setIsModalOpen(!isModalOpen)}
				className="flex items-center gap-2 p-4 hover:bg-white/10 cursor-pointer"
			>
				<RxAvatar />
				<p className="text-sm">Edit Profile</p>
			</Link>
			<Link
				to="/applied-jobs"
				onClick={() => setIsModalOpen(!isModalOpen)}
				className="flex items-center gap-2 p-4 hover:bg-white/10 cursor-pointer"
			>
				<MdOutlineSavedSearch className="text-2xl" />
				<p className="text-sm">Applied Internships</p>
			</Link>
			<div
				onClick={() => {
					localStorage.removeItem("token");
					updateIsUserLoggedIn(false);
					navigate("/login");
				}}
				className="flex items-center gap-2 p-4 hover:bg-white/10 cursor-pointer"
			>
				<MdLogout />
				<p className="text-sm">Logout</p>
			</div>
		</div>
	);
}
