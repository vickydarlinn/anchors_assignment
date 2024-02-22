import React, { useContext } from "react";
import UserProfile from "./userProfile";
import { Link } from "react-router-dom";
import { UserInfoContext } from "../../context/userInfoContext";

const Header = () => {
	const { userInfo } = useContext(UserInfoContext);

	return (
		<div className="flex justify-between items-center px-10 py-5 bg-[#181326] sticky top-0">
			<Link to="/" className="text-2xl font-bold">
				InternVilla
			</Link>
			<div className="flex items-center gap-6">
				<span className="bg-secondary text-primary px-4 py-1 rounded-3xl">
					{userInfo?.coins} 🪙
				</span>
				<UserProfile />
			</div>
		</div>
	);
};

export default Header;
